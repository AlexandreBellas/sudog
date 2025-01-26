<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\Level;
use App\Services\SudokuTodoGenerateService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BoardsController extends Controller
{
    public function __construct(private SudokuTodoGenerateService $sudokuTodoGenerateService) {}

    public function random(Request $request)
    {
        $levelQuery = $request->query('level');
        $level = Level::where('slug', $levelQuery)->first();
        if (! $level) {
            return response()->json([
                'errors' => [
                    'title' => 'Invalid level',
                    'detail' => "The level '$levelQuery' is invalid.",
                    'code' => 'invalid_level',
                    'status' => '400',
                ],
            ], 400);
        }

        $board = Board::where('level', $level->slug)->inRandomOrder()->first();

        if (! $board) {
            return response()->json([
                'errors' => [
                    'title' => 'No boards found',
                    'detail' => "No boards found for level '$levelQuery'.",
                    'code' => 'no_boards_found',
                    'status' => '404',
                ],
            ], 404);
        }

        return response()->json($board);
    }

    public function generate(Request $request)
    {
        $adminId = config('sudoku.admin_id');
        $requestAdminId = $request->header('X-Admin-Id');

        if ($adminId !== $requestAdminId) {
            return response()->json([
                'errors' => [
                    'title' => 'Unauthorized',
                    'detail' => 'You are not authorized to generate a board.',
                    'code' => 'unauthorized',
                    'status' => '401',
                ],
            ], 401);
        }

        $levelQuery = $request->input('level', 'easy');
        $level = Level::where('slug', $levelQuery)->first();
        if (! $level) {
            return response()->json([
                'errors' => [
                    'title' => 'Invalid level',
                    'detail' => "The level '$levelQuery' is invalid.",
                    'code' => 'invalid_level',
                    'status' => '400',
                ],
            ], 400);
        }

        $number = $request->input('number', 1);
        if (
            ! $number
            || is_array($number)
            || (gettype($number) === 'string' && ! ctype_digit($number))
            || ((int) $number < 1)
        ) {
            return response()->json([
                'errors' => [
                    'title' => 'Invalid number',
                    'detail' => "The number '$number' is invalid.",
                    'code' => 'invalid_number',
                    'status' => '400',
                ],
            ], 400);
        }

        $boards = [];

        for ($i = 0; $i < (int) $number; $i++) {
            try {
                $board = $this->sudokuTodoGenerateService->execute($level->slug);
                $board->save();
                $boards[] = $board;
            } catch (\Exception $e) {
                Log::error('Error generating board', [
                    'level' => $level->slug,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        return response()->json([
            'count' => count($boards),
            'data' => $boards,
        ]);
    }
}

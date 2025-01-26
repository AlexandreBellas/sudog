<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\Level;
use Illuminate\Http\Request;

class BoardsController extends Controller
{
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
}

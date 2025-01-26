<?php

namespace Tests\Feature\Services;

use App\Models\Board;
use App\Services\SudokuTodoGenerateService;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class SudokuTodoGenerateServiceTest extends TestCase
{
    private string $exampleApiPuzzle = "<table class=\"su-preview sd-9\" style=\"font-family:'helvetica', 'arial';background-color:#fff\"><tr><td class=\"su-cell-wall su-cell-shade su-filled\">6<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">5<\/td><td class=\"su-cell-wall su-wall-r\"><\/td><td class=\"su-cell-wall su-cell-shade su-filled\">9<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">8<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">7<\/td><td class=\"su-cell-wall\"><\/td><td class=\"su-cell-wall su-cell-shade su-filled\">1<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">2<\/td><\/tr><tr><td class=\"su-cell-wall\"><\/td><td class=\"su-cell-wall su-cell-shade su-filled\">4<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">2<\/td><td class=\"su-cell-wall\"><\/td><td class=\"su-cell-wall su-cell-shade su-filled\">3<\/td><td class=\"su-cell-wall su-wall-r\"><\/td><td class=\"su-cell-wall\"><\/td><td class=\"su-cell-wall su-cell-shade su-filled\">9<\/td><td class=\"su-cell-wall\"><\/td><\/tr><tr class=\"su-wall\"><td class=\"su-cell-wall su-cell-shade su-filled\">9<\/td><td class=\"su-cell-wall\"><\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">8<\/td><td class=\"su-cell-wall\"><\/td><td class=\"su-cell-wall su-cell-shade su-filled\">2<\/td><td class=\"su-cell-wall su-wall-r\"><\/td><td class=\"su-cell-wall su-cell-shade su-filled\">5<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">6<\/td><td class=\"su-cell-wall\"><\/td><\/tr><tr><td class=\"su-cell-wall su-cell-shade su-filled\">3<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">1<\/td><td class=\"su-cell-wall su-wall-r\"><\/td><td class=\"su-cell-wall su-cell-shade su-filled\">4<\/td><td class=\"su-cell-wall\"><\/td><td class=\"su-cell-wall su-wall-r\"><\/td><td class=\"su-cell-wall su-cell-shade su-filled\">8<\/td><td class=\"su-cell-wall\"><\/td><td class=\"su-cell-wall su-cell-shade su-filled\">9<\/td><\/tr><tr><td class=\"su-cell-wall su-cell-shade su-filled\">4<\/td><td class=\"su-cell-wall\"><\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">6<\/td><td class=\"su-cell-wall\"><\/td><td class=\"su-cell-wall su-cell-shade su-filled\">9<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">8<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">1<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">3<\/td><td class=\"su-cell-wall\"><\/td><\/tr><tr class=\"su-wall\"><td class=\"su-cell-wall\"><\/td><td class=\"su-cell-wall\"><\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">9<\/td><td class=\"su-cell-wall\"><\/td><td class=\"su-cell-wall su-cell-shade su-filled\">5<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">1<\/td><td class=\"su-cell-wall\"><\/td><td class=\"su-cell-wall su-cell-shade su-filled\">4<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">6<\/td><\/tr><tr><td class=\"su-cell-wall su-cell-shade su-filled\">8<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">9<\/td><td class=\"su-cell-wall su-wall-r\"><\/td><td class=\"su-cell-wall\"><\/td><td class=\"su-cell-wall\"><\/td><td class=\"su-cell-wall su-wall-r\"><\/td><td class=\"su-cell-wall su-cell-shade su-filled\">6<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">5<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">4<\/td><\/tr><tr><td class=\"su-cell-wall su-cell-shade su-filled\">5<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">6<\/td><td class=\"su-cell-wall su-wall-r\"><\/td><td class=\"su-cell-wall su-cell-shade su-filled\">8<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">7<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">9<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">3<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">2<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">1<\/td><\/tr><tr><td class=\"su-cell-wall\"><\/td><td class=\"su-cell-wall\"><\/td><td class=\"su-cell-wall su-wall-r\"><\/td><td class=\"su-cell-wall su-cell-shade su-filled\">5<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">4<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">6<\/td><td class=\"su-cell-wall\"><\/td><td class=\"su-cell-wall\"><\/td><td class=\"su-cell-wall su-cell-shade su-filled\">7<\/td><\/tr><\/table>";

    private string $exampleApiSolvedPuzzle = "<table class=\"su-preview sd-9\" style=\"font-family:'helvetica', 'arial';background-color:#fff\"><tr><td class=\"su-cell-wall su-cell-shade su-filled\">6<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">5<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">3<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">9<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">8<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">7<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">4<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">1<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">2<\/td><\/tr><tr><td class=\"su-cell-wall su-cell-shade su-filled\">1<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">4<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">2<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">6<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">3<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">5<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">7<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">9<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">8<\/td><\/tr><tr class=\"su-wall\"><td class=\"su-cell-wall su-cell-shade su-filled\">9<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">7<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">8<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">1<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">2<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">4<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">5<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">6<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">3<\/td><\/tr><tr><td class=\"su-cell-wall su-cell-shade su-filled\">3<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">1<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">5<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">4<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">6<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">2<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">8<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">7<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">9<\/td><\/tr><tr><td class=\"su-cell-wall su-cell-shade su-filled\">4<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">2<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">6<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">7<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">9<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">8<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">1<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">3<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">5<\/td><\/tr><tr class=\"su-wall\"><td class=\"su-cell-wall su-cell-shade su-filled\">7<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">8<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">9<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">3<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">5<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">1<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">2<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">4<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">6<\/td><\/tr><tr><td class=\"su-cell-wall su-cell-shade su-filled\">8<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">9<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">7<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">2<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">1<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">3<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">6<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">5<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">4<\/td><\/tr><tr><td class=\"su-cell-wall su-cell-shade su-filled\">5<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">6<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">4<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">8<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">7<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">9<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">3<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">2<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">1<\/td><\/tr><tr><td class=\"su-cell-wall su-cell-shade su-filled\">2<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">3<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">1<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">5<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">4<\/td><td class=\"su-cell-wall su-wall-r su-cell-shade su-filled\">6<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">9<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">8<\/td><td class=\"su-cell-wall su-cell-shade su-filled\">7<\/td><\/tr><\/table>";

    public function test_it_can_generate_a_sudoku_board()
    {
        Http::fake([
            SudokuTodoGenerateService::$url => Http::response(['puzz' => $this->exampleApiPuzzle], 200),
        ]);

        $service = new SudokuTodoGenerateService;

        $board = $service->execute('easy');

        $this->assertInstanceOf(Board::class, $board);
        $this->assertEquals(3, $board->size);
        $this->assertEquals('easy', $board->level);
        $this->assertIsArray($board->content);
        $this->assertCount(9, $board->content);
        $this->assertCount(9, $board->content[0]);
        $this->assertEquals([
            [6, 5, null, 9, 8, 7, null, 1, 2],
            [null, 4, 2, null, 3, null, null, 9, null],
            [9, null, 8, null, 2, null, 5, 6, null],
            [3, 1, null, 4, null, null, 8, null, 9],
            [4, null, 6, null, 9, 8, 1, 3, null],
            [null, null, 9, null, 5, 1, null, 4, 6],
            [8, 9, null, null, null, null, 6, 5, 4],
            [5, 6, null, 8, 7, 9, 3, 2, 1],
            [null, null, null, 5, 4, 6, null, null, 7],
        ], $board->content);
    }

    public function test_it_can_generate_a_sudoku_board_with_solved()
    {
        Http::fake([
            SudokuTodoGenerateService::$url => Http::response([
                'puzz' => $this->exampleApiPuzzle,
                'soln' => $this->exampleApiSolvedPuzzle,
            ], 200),
        ]);

        $service = new SudokuTodoGenerateService;

        $board = $service->execute('easy');

        $this->assertInstanceOf(Board::class, $board);
        $this->assertEquals(3, $board->size);
        $this->assertEquals('easy', $board->level);
        $this->assertIsArray($board->content);
        $this->assertCount(9, $board->content);
        $this->assertCount(9, $board->content[0]);
        $this->assertEquals([
            [6, 5, null, 9, 8, 7, null, 1, 2],
            [null, 4, 2, null, 3, null, null, 9, null],
            [9, null, 8, null, 2, null, 5, 6, null],
            [3, 1, null, 4, null, null, 8, null, 9],
            [4, null, 6, null, 9, 8, 1, 3, null],
            [null, null, 9, null, 5, 1, null, 4, 6],
            [8, 9, null, null, null, null, 6, 5, 4],
            [5, 6, null, 8, 7, 9, 3, 2, 1],
            [null, null, null, 5, 4, 6, null, null, 7],
        ], $board->content);
        $this->assertIsArray($board->solved);
        $this->assertCount(9, $board->solved);
        $this->assertCount(9, $board->solved[0]);
        $this->assertEquals([
            [6, 5, 3, 9, 8, 7, 4, 1, 2],
            [1, 4, 2, 6, 3, 5, 7, 9, 8],
            [9, 7, 8, 1, 2, 4, 5, 6, 3],
            [3, 1, 5, 4, 6, 2, 8, 7, 9],
            [4, 2, 6, 7, 9, 8, 1, 3, 5],
            [7, 8, 9, 3, 5, 1, 2, 4, 6],
            [8, 9, 7, 2, 1, 3, 6, 5, 4],
            [5, 6, 4, 8, 7, 9, 3, 2, 1],
            [2, 3, 1, 5, 4, 6, 9, 8, 7],
        ], $board->solved);
    }

    public function test_it_should_not_generate_with_invalid_difficulty()
    {
        $service = new SudokuTodoGenerateService;

        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid difficulty level: "invalid"');
        $service->execute('invalid');
    }

    public function test_it_should_not_generate_with_no_puzzle_in_api_response()
    {
        Http::fake([
            SudokuTodoGenerateService::$url => Http::response('No puzzle found', 200),
        ]);

        $service = new SudokuTodoGenerateService;

        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('No puzzle found in response: No puzzle found');
        $service->execute('easy');
    }

    public function test_it_should_not_generate_with_unsuccessful_api_response()
    {
        Http::fake([
            SudokuTodoGenerateService::$url => Http::response('Failed to generate sudoku board', 500),
        ]);

        $service = new SudokuTodoGenerateService;

        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Failed to generate sudoku board: Failed to generate sudoku board');
        $service->execute('easy');
    }
}

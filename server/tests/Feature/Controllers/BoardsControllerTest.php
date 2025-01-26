<?php

namespace Tests\Feature;

use App\Models\Board;
use App\Models\Level;
use App\Services\SudokuTodoGenerateService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;
use Mockery\MockInterface;
use Tests\TestCase;

class BoardsControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_should_return_a_random_board(): void
    {
        $level = Level::factory()->create();
        $board = Board::factory()->withDefaultBoard()->create([
            'level' => $level->slug,
        ]);

        $response = $this->get("/boards/random?level={$level->slug}");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'id',
            'level',
            'size',
            'content',
            'solved',
        ]);
        $response->assertJson([
            'id' => $board->id,
            'level' => $board->level,
            'size' => $board->size,
            'content' => $board->content,
            'solved' => $board->solved,
        ]);
    }

    public function test_it_should_not_return_a_random_board_with_invalid_level_param(): void
    {
        $response = $this->get('/boards/random?level=invalid');

        $response->assertStatus(400);
    }

    public function test_it_should_not_return_a_random_board_when_there_is_none(): void
    {
        $level = Level::factory()->create();

        $response = $this->get("/boards/random?level={$level->slug}");

        $response->assertStatus(404);
    }

    public function test_it_should_generate_a_list_of_boards(): void
    {
        $adminId = config('sudoku.admin_id');
        $level = Level::factory()->create();
        $board1 = Board::factory()->withDefaultBoard()->create(['level' => $level->slug, 'content' => [], 'solved' => []]);
        $board2 = Board::factory()->withDefaultBoard()->create(['level' => $level->slug]);
        $this->mock(SudokuTodoGenerateService::class, function (MockInterface $mock) use ($level, $board1, $board2) {
            $mock->shouldReceive('execute')->with($level->slug)->andReturnValues([
                $board1,
                $board2,
            ]);
        });

        $response = $this->withHeader('X-Admin-Id', $adminId)->post('/boards/generate', [
            'level' => $level->slug,
            'number' => 2,
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'count',
            'data',
        ]);
        $response->assertJson([
            'count' => 2,
            'data' => [
                $board1->toArray(),
                $board2->toArray(),
            ],
        ]);
    }

    public function test_it_should_not_generate_a_list_of_boards_with_invalid_admin_id(): void
    {
        $adminId = fake()->word();

        $response = $this->withHeader('X-Admin-Id', $adminId)->post('/boards/generate');

        $response->assertStatus(401);
    }

    public function test_it_should_not_generate_a_list_of_boards_with_invalid_level(): void
    {
        $adminId = config('sudoku.admin_id');

        $response = $this->withHeader('X-Admin-Id', $adminId)->post('/boards/generate', [
            'level' => 'invalid',
            'number' => 2,
        ]);

        $response->assertStatus(400);
    }

    public function test_it_should_not_generate_a_list_of_boards_with_invalid_number(): void
    {
        $adminId = config('sudoku.admin_id');
        $level = Level::factory()->create();

        $response = $this->withHeader('X-Admin-Id', $adminId)->post('/boards/generate', [
            'level' => $level->slug,
            'number' => 'invalid',
        ]);

        $response->assertStatus(400);
    }

    public function test_it_should_not_generate_a_list_of_boards_with_unsuccessful_generation(): void
    {
        Log::spy();
        $adminId = config('sudoku.admin_id');
        $level = Level::factory()->create();
        $this->mock(SudokuTodoGenerateService::class, function (MockInterface $mock) use ($level) {
            $mock->shouldReceive('execute')->with($level->slug)->andThrow(new \Exception);
        });

        $response = $this->withHeader('X-Admin-Id', $adminId)->post('/boards/generate', [
            'level' => $level->slug,
            'number' => 2,
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'count' => 0,
            'data' => [],
        ]);
        Log::shouldHaveReceived('error')->times(2);
    }
}

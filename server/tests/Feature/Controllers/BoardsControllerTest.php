<?php

namespace Tests\Feature;

use App\Models\Board;
use App\Models\Level;
use Illuminate\Foundation\Testing\RefreshDatabase;
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
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Board>
 */
class BoardFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'board_id' => Str::uuid(),
            'level' => 'easy',
            'size' => 3,
        ];
    }

    public function withDefaultBoard(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'content' => [
                    [6, 5, null, 9, 8, 7, null, 1, 2],
                    [null, 4, 2, null, 3, null, null, 9, null],
                    [9, null, 8, null, 2, null, 5, 6, null],
                    [3, 1, null, 4, null, null, 8, null, 9],
                    [4, null, 6, null, 9, 8, 1, 3, null],
                    [null, null, 9, null, 5, 1, null, 4, 6],
                    [8, 9, null, null, null, null, 6, 5, 4],
                    [5, 6, null, 8, 7, 9, 3, 2, 1],
                    [null, null, null, 5, 4, 6, null, null, 7],
                ],
                'solved' => [
                    [6, 5, 3, 9, 8, 7, 4, 1, 2],
                    [1, 4, 2, 6, 3, 5, 7, 9, 8],
                    [9, 7, 8, 1, 2, 4, 5, 6, 3],
                    [3, 1, 5, 4, 6, 2, 8, 7, 9],
                    [4, 2, 6, 7, 9, 8, 1, 3, 5],
                    [7, 8, 9, 3, 5, 1, 2, 4, 6],
                    [8, 9, 7, 2, 1, 3, 6, 5, 4],
                    [5, 6, 4, 8, 7, 9, 3, 2, 1],
                    [2, 3, 1, 5, 4, 6, 9, 8, 7],
                ],
            ];
        });
    }
}

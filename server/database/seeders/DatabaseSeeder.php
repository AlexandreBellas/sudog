<?php

namespace Database\Seeders;

use App\Models\Level;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $levels = json_decode(
            file_get_contents(base_path('database/seeders/levels.json')),
            true
        );

        foreach ($levels as $level) {
            @[
                'slug' => $slug,
                'name' => $name,
                'description' => $description,
            ] = $level;

            Level::updateOrCreate([
                'slug' => $slug,
            ], [
                'name' => $name,
                'description' => $description,
            ]);
        }
    }
}

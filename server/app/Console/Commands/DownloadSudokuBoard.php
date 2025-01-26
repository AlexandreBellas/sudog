<?php

namespace App\Console\Commands;

use App\Models\Level;
use App\Services\SudokuTodoGenerateService;
use Illuminate\Console\Command;

class DownloadSudokuBoard extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'board:download
        {level=easy : The level to scrape}
        {number=10 : The number of boards to scrape}
        {--s|size=3 : The size of the sudoku board}
    ';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Downloads sudoku boards and save them to the database';

    protected function promptForMissingArgumentsUsing(): array
    {
        return [
            'level' => 'Which level should be downloaded?',
            'number' => 'How many boards should be downloaded?',
        ];
    }

    /**
     * Execute the console command.
     */
    public function handle(SudokuTodoGenerateService $sudokuTodoGenerateService)
    {
        $argLevel = $this->argument('level');
        $level = Level::where('slug', $argLevel)->first();
        if (! $level) {
            $this->error("Invalid level \"{$argLevel}\"");

            return;
        }

        $this->info("Downloading sudoku boards for {$level->name} level...");

        $number = $this->argument('number');
        if (! ctype_digit($number)) {
            $this->error('Invalid number of boards.');

            return;
        }

        for ($i = 0; $i < (int) $number; $i++) {
            try {
                $board = $sudokuTodoGenerateService->execute($level->slug);
                $board->save();

                $this->info("Saved board {$board->board_id} for {$level->name} level");
            } catch (\Exception $e) {
                $this->error("Error downloading sudoku boards for {$level->name} level: {$e->getMessage()}");
            }
        }
    }
}

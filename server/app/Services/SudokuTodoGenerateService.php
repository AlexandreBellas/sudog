<?php

namespace App\Services;

use App\Models\Board;
use App\Services\Base\BaseService;
use Illuminate\Support\Facades\Http;

class SudokuTodoGenerateService extends BaseService
{
    public static string $url = 'https://sudokutodo.com/wp-content/themes/puzzles/generator/server/gen.php';

    public static array $difficultyCodes = [
        'easy' => '1',
        'medium' => '2',
        'hard' => '3',
        'expert' => '4',
    ];

    private function parseHtmlTableBoard(string $htmlTableBoard, int $size): array
    {
        $htmlTableBoard = str_replace('\\', '', $htmlTableBoard);

        /** @var array<array<int|null>> $board */
        $board = [];

        $dom = new \DOMDocument;
        $dom->loadHTML("<html><body>{$htmlTableBoard}</body></html>");

        $table = $dom->getElementsByTagName('table')->item(0);

        if (! $table) {
            throw new \Exception('No table found.');
        }

        for ($i = 0; $i < $size * $size; $i++) {
            $board[$i] = [];

            $row = $table->childNodes->item($i);
            $rowCells = $row->childNodes;

            for ($j = 0; $j < $size * $size; $j++) {
                $cell = $rowCells->item($j);
                $cellValue = $cell?->textContent;

                $board[$i][$j] = $cellValue ? (int) $cellValue : null;
            }
        }

        return $board;
    }

    public function execute(string $level): Board
    {
        if (! isset(self::$difficultyCodes[$level])) {
            throw new \Exception("Invalid difficulty level: \"{$level}\"");
        }

        $difficultyCode = self::$difficultyCodes[$level];
        $size = 3;

        $sudokuGenerationResponse = Http::post(self::$url, [
            'size' => $size * $size,
            'difficulty' => $difficultyCode,
            'font' => 'sans',
            'usol' => '1',
            'shade' => '1',
            'algo' => '1',
            'ecell' => '',
        ]);

        $sudokuGenerationResponseBody = $sudokuGenerationResponse->body();

        if (! $sudokuGenerationResponse->successful()) {
            throw new \Exception(
                "Failed to generate sudoku board: {$sudokuGenerationResponseBody}",
                $sudokuGenerationResponse->status()
            );
        }

        $decodedSudokuGenerationResponseBody = json_decode($sudokuGenerationResponseBody, true);

        if (! isset($decodedSudokuGenerationResponseBody['puzz'])) {
            throw new \Exception("No puzzle found in response: {$sudokuGenerationResponseBody}");
        }

        $boardContent = $this->parseHtmlTableBoard(
            $decodedSudokuGenerationResponseBody['puzz'],
            $size
        );

        $board = Board::factory()->make([
            'level' => $level,
            'size' => $size,
            'content' => $boardContent,
        ]);

        if (isset($decodedSudokuGenerationResponseBody['soln'])) {
            $boardSolved = $this->parseHtmlTableBoard(
                $decodedSudokuGenerationResponseBody['soln'],
                $size
            );

            $board->solved = $boardSolved;
        }

        return $board;
    }
}

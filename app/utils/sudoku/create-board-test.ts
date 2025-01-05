import { IBoard } from "@/@types/board"
import { IDifficultyLevel } from "@/@types/game"
import { easySolvedPuzzle } from "./puzzles/easy"

export function createBoardTest(level: IDifficultyLevel = "easy"): IBoard {
    return easySolvedPuzzle
}

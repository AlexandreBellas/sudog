import { IBoard } from "@/@types/board"
import { IDifficultyLevel } from "@/@types/game"
import { easySolvedPuzzle } from "./solved-puzzles/easy"

export function createBoardTest(level: IDifficultyLevel = "easy"): IBoard {
    console.log(level)
    return easySolvedPuzzle
}

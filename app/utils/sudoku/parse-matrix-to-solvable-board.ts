import { IDifficultyLevel } from "@/@types/game"
import { ISaveableBoard } from "@/services/IBoardGateway"
import { solveBoard } from "./solve-board"

export function parseMatrixToSolvableBoard(matrix: (number | null)[][], level?: IDifficultyLevel): ISaveableBoard {
    const board = matrix.map((row) => row.map((value) => ({ value, isClue: !!value, notes: [] })))
    const solvedBoard = solveBoard(board)

    if (!solvedBoard.hasBeenSolved) {
        throw new Error("Failed to solve board")
    }

    return {
        board,
        solvedBoard: solvedBoard.board,
        history: [],
        level: level ?? "easy"
    }
}

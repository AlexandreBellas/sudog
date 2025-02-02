import { ISaveableBoard } from "@/services/IBoardGateway"
import { solveBoard } from "./solve-board"

export function parseMatrixToSolvableBoard(matrix: (number | null)[][]): ISaveableBoard {
    const board = matrix.map((row) => row.map((value) => ({ value, isClue: true, notes: [] })))
    const solvedBoard = solveBoard(board)

    if (!solvedBoard.hasBeenSolved) {
        throw new Error("Failed to solve board")
    }

    return {
        board,
        solvedBoard: solvedBoard.board,
        history: []
    }
}

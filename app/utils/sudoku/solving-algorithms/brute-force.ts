import { ITile } from "@/@types/tile"
import { blockSize, boardSize } from "@/constants/game"
import { deepCopy } from "@/utils/deep-copy"
import { isBoardFull } from "../is-board-full"
import { isBoardInValidState } from "../is-board-in-valid-state"
import { ISolveOutput } from "../solve-board"

export function bruteForce(originalBoard: ITile[][], iStart = 0, jStart = 0): ISolveOutput {
    const board = deepCopy(originalBoard)

    let i = iStart
    let j = jStart

    while (i < boardSize * blockSize && j < boardSize * blockSize) {
        if (board[i][j].value !== null) {
            if (j === boardSize * blockSize - 1) {
                i++
                j = 0
            } else {
                j++
            }

            continue
        }

        for (let possibleValue = 1; possibleValue <= blockSize * blockSize; possibleValue++) {
            board[i][j].value = possibleValue

            if (isBoardInValidState(board)) {
                if (isBoardFull(board)) return { board, hasBeenSolved: true }

                const { board: furtherBoard, hasBeenSolved } = bruteForce(board, i, j)
                if (hasBeenSolved) return { board: furtherBoard, hasBeenSolved: true }
            }
        }

        // No number worked for this configuration => no solution!
        return { board: originalBoard, hasBeenSolved: false }
    }

    return { board: originalBoard, hasBeenSolved: false }
}

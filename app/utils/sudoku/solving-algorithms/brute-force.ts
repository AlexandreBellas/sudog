import { ITile } from "@/@types/tile"
import { blockSize, boardSize } from "@/constants/game"
import { deepCopy } from "@/utils/deep-copy"
import { isBoardInValidState } from "../is-board-in-valid-state"
import { ISolveOutput } from "../solve-board"

export function bruteForce(originalBoard: ITile[][], iStart = 0, jStart = 0): ISolveOutput {
    const board = deepCopy(originalBoard)

    for (let i = iStart; i < boardSize * blockSize; i++) {
        for (let j = jStart; j < boardSize * blockSize; j++) {
            if (board[i][j].value !== null) continue

            for (let possibleValue = 1; possibleValue <= blockSize * blockSize; possibleValue++) {
                board[i][j].value = possibleValue

                if (isBoardInValidState(board)) {
                    const { board: furtherBoard, hasBeenSolved } = bruteForce(board, i, j)
                    if (hasBeenSolved) return { board: furtherBoard, hasBeenSolved: true }
                }
            }

            // No number worked for this configuration => no solution!
            return { board: originalBoard, hasBeenSolved: false }
        }
    }

    return { board: originalBoard, hasBeenSolved: false }
}

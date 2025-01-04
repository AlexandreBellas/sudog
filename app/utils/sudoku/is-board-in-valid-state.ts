import { blockSize, boardSize } from "@/constants/game"
import { doesArrayHasDuplicates } from "../array/does-array-has-duplicates"
import { transposeArray } from "../array/transpose-array"
import { ITile } from "@/@types/tile"

export function isBoardInValidState(board: ITile[][]): boolean {
    // Check all rows
    for (const row of board) {
        if (doesArrayHasDuplicates(row.filter(i => i.value !== null))) return false
    }

    // Check all columns
    for (const col of transposeArray(board)) {
        if (doesArrayHasDuplicates(col.filter(i => i.value !== null))) return false
    }

    // Check all blocks
    for (let iBlock = 0; iBlock < boardSize; iBlock++) {
        for (let jBlock = 0; jBlock < boardSize; jBlock++) {
            const tiles = board
                .slice(iBlock * boardSize, (iBlock + 1) * blockSize) // rows
                .map(row => row.slice(jBlock * boardSize, (jBlock + 1) * blockSize)) // columns
                .flat()

            if (doesArrayHasDuplicates(tiles.filter(i => i.value !== null))) return false
        }
    }

    return true
}
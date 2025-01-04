import { ITile } from "@/@types/tile"
import { blockSize, boardSize } from "@/constants/game"

export function createNewEmptyBoard(): ITile[][] {
    const board: ITile[][] = []

    for (let i = 0; i < boardSize * blockSize; i++) {
        const row: ITile[] = []
        for (let j = 0; j < boardSize * blockSize; j++) {
            row.push({ value: null, notes: [] })
        }

        board.push(row)
    }

    return board
}
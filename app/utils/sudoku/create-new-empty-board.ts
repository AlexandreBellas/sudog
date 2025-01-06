import { IPlayableTile } from "@/@types/tile"
import { blockSize, boardSize } from "@/constants/game"

export function createNewEmptyBoard(): IPlayableTile[][] {
    const board: IPlayableTile[][] = []

    for (let i = 0; i < boardSize * blockSize; i++) {
        const row: IPlayableTile[] = []
        for (let j = 0; j < boardSize * blockSize; j++) {
            row.push({ value: null, notes: [], isClue: false })
        }

        board.push(row)
    }

    return board
}

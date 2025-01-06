import { ITile } from "@/@types/tile"

export function isBoardFull(board: ITile[][]): board is ITile<number>[][] {
    return board.every((row) => row.every((tile) => tile.value !== null))
}

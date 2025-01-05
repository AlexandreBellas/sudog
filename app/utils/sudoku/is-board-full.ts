import { ITile } from "@/@types/tile"

export function isBoardFull(board: ITile[][]): boolean {
    return board.every((row) => row.every((tile) => tile.value !== null))
}

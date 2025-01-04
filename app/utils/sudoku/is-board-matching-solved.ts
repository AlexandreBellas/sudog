import { IBoard } from "@/@types/board";

export function isBoardMatchingSolved(board: IBoard): boolean {
    return board.current.every((row, i) => row.every((tile, j) => tile.value === board.solved[i][j].value))
}
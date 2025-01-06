import { IPlayableTile, ITile } from "./tile"

export interface IBoard {
    current: IPlayableTile[][]
    solved: ITile<number>[][]
}

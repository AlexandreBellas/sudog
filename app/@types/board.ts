import { ITile } from "./tile"

export interface IBoard {
    current: ITile[][]
    solved: ITile[][]
}

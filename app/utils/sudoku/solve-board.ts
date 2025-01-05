import { ITile } from "@/@types/tile"
import { deepCopy } from "../deep-copy"
import { bruteForce } from "./solving-algorithms/brute-force"

export interface ISolveOutput {
    board: ITile[][]
    hasBeenSolved: boolean
}

export function solveBoard(originalBoard: ITile[][]): ISolveOutput {
    const board = deepCopy(originalBoard)

    return bruteForce(board)
}

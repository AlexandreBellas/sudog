import { ITile } from "@/@types/tile";
import { bruteForce } from "./solving-algorithms/brute-force";
import { deepCopy } from "../deep-copy";

export interface ISolveOutput {
    board: ITile[][]
    hasBeenSolved: boolean
}

export function solveBoard(originalBoard: ITile[][]): ISolveOutput {
    const board = deepCopy(originalBoard)

    return bruteForce(board)
}
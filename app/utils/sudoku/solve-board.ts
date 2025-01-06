import { ITile } from "@/@types/tile"
import { deepCopy } from "../deep-copy"
import { bruteForce } from "./solving-algorithms/brute-force"

export type ISolveOutput =
    | {
          board: ITile[][]
          hasBeenSolved: false
      }
    | {
          board: ITile<number>[][]
          hasBeenSolved: true
      }

export function solveBoard(originalBoard: ITile[][]): ISolveOutput {
    const board = deepCopy(originalBoard)

    return bruteForce(board)
}

import { easySolvedPuzzle } from "../puzzles/easy"
import { impossiblePuzzle } from "../puzzles/impossible"
import { bruteForce } from "./brute-force"

describe("Brute force algorithm", () => {
    it("should solve a simple puzzle", () => {
        const board = easySolvedPuzzle

        const solvedBoard = bruteForce(board.current)

        expect(solvedBoard.hasBeenSolved).toBeTruthy()
    })

    it("should mark as not solved when impossible to solve", () => {
        const board = impossiblePuzzle

        const solvedBoard = bruteForce(board.current)

        expect(solvedBoard.hasBeenSolved).toBeFalsy()
    })
})

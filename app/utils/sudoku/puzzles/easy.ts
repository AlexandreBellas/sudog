import { IBoard } from "@/@types/board"
import { IPlayableTile } from "@/@types/tile"
import { solveBoard } from "../solve-board"

const easyInitialState: IPlayableTile[][] = [
    [
        { value: 6, notes: [], isClue: true },
        { value: null, notes: [], isClue: false },
        { value: 4, notes: [], isClue: true },
        { value: 8, notes: [], isClue: true },
        { value: null, notes: [], isClue: false },
        { value: 9, notes: [], isClue: true },
        { value: null, notes: [], isClue: false },
        { value: 5, notes: [], isClue: true },
        { value: 1, notes: [], isClue: true }
    ],
    [
        { value: 9, notes: [], isClue: true },
        { value: null, notes: [], isClue: false },
        { value: 7, notes: [], isClue: true },
        { value: null, notes: [], isClue: false },
        { value: 3, notes: [], isClue: true },
        { value: null, notes: [], isClue: false },
        { value: 4, notes: [], isClue: true },
        { value: null, notes: [], isClue: false },
        { value: 2, notes: [], isClue: true }
    ],
    [
        { value: 5, notes: [], isClue: true },
        { value: 1, notes: [], isClue: true },
        { value: null, notes: [], isClue: false },
        { value: null, notes: [], isClue: false },
        { value: null, notes: [], isClue: false },
        { value: 6, notes: [], isClue: true },
        { value: null, notes: [], isClue: false },
        { value: 9, notes: [], isClue: true },
        { value: null, notes: [], isClue: false }
    ],
    [
        { value: 1, notes: [], isClue: true },
        { value: null, notes: [], isClue: false },
        { value: 2, notes: [], isClue: true },
        { value: 6, notes: [], isClue: true },
        { value: null, notes: [], isClue: false },
        { value: 4, notes: [], isClue: true },
        { value: 8, notes: [], isClue: true },
        { value: null, notes: [], isClue: false },
        { value: null, notes: [], isClue: false }
    ],
    [
        { value: 7, notes: [], isClue: true },
        { value: 9, notes: [], isClue: true },
        { value: null, notes: [], isClue: false },
        { value: null, notes: [], isClue: false },
        { value: 2, notes: [], isClue: true },
        { value: 1, notes: [], isClue: true },
        { value: 5, notes: [], isClue: true },
        { value: 4, notes: [], isClue: true },
        { value: null, notes: [], isClue: false }
    ],
    [
        { value: 4, notes: [], isClue: true },
        { value: 6, notes: [], isClue: true },
        { value: 5, notes: [], isClue: true },
        { value: 9, notes: [], isClue: true },
        { value: 8, notes: [], isClue: true },
        { value: null, notes: [], isClue: false },
        { value: 2, notes: [], isClue: true },
        { value: 1, notes: [], isClue: true },
        { value: null, notes: [], isClue: false }
    ],
    [
        { value: null, notes: [], isClue: false },
        { value: null, notes: [], isClue: false },
        { value: 6, notes: [], isClue: true },
        { value: null, notes: [], isClue: false },
        { value: null, notes: [], isClue: false },
        { value: 8, notes: [], isClue: true },
        { value: 1, notes: [], isClue: true },
        { value: 2, notes: [], isClue: true },
        { value: null, notes: [], isClue: false }
    ],
    [
        { value: null, notes: [], isClue: false },
        { value: 7, notes: [], isClue: true },
        { value: 9, notes: [], isClue: true },
        { value: null, notes: [], isClue: false },
        { value: 1, notes: [], isClue: true },
        { value: null, notes: [], isClue: false },
        { value: null, notes: [], isClue: false },
        { value: 3, notes: [], isClue: true },
        { value: 5, notes: [], isClue: true }
    ],
    [
        { value: 2, notes: [], isClue: true },
        { value: 4, notes: [], isClue: true },
        { value: 1, notes: [], isClue: true },
        { value: 5, notes: [], isClue: true },
        { value: 6, notes: [], isClue: true },
        { value: null, notes: [], isClue: false },
        { value: null, notes: [], isClue: false },
        { value: 8, notes: [], isClue: true },
        { value: 7, notes: [], isClue: true }
    ]
]

const easySolvedBoard = solveBoard(easyInitialState)

export const easySolvedPuzzle: IBoard = {
    current: easyInitialState,
    solved: easySolvedBoard.hasBeenSolved ? easySolvedBoard.board : []
}

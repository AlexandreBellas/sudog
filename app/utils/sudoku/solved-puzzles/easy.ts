import { IBoard } from "@/@types/board"
import { solveBoard } from "../solve-board"

const easyInitialState = [
    [
        { value: 6, notes: [] },
        { value: null, notes: [] },
        { value: 4, notes: [] },
        { value: 8, notes: [] },
        { value: null, notes: [] },
        { value: 9, notes: [] },
        { value: null, notes: [] },
        { value: 5, notes: [] },
        { value: 1, notes: [] }
    ],
    [
        { value: 9, notes: [] },
        { value: null, notes: [] },
        { value: 7, notes: [] },
        { value: null, notes: [] },
        { value: 3, notes: [] },
        { value: null, notes: [] },
        { value: 4, notes: [] },
        { value: null, notes: [] },
        { value: 2, notes: [] }
    ],
    [
        { value: 5, notes: [] },
        { value: 1, notes: [] },
        { value: null, notes: [] },
        { value: null, notes: [] },
        { value: null, notes: [] },
        { value: 6, notes: [] },
        { value: null, notes: [] },
        { value: 9, notes: [] },
        { value: null, notes: [] }
    ],
    [
        { value: 1, notes: [] },
        { value: null, notes: [] },
        { value: 2, notes: [] },
        { value: 6, notes: [] },
        { value: null, notes: [] },
        { value: 4, notes: [] },
        { value: 8, notes: [] },
        { value: null, notes: [] },
        { value: null, notes: [] }
    ],
    [
        { value: 7, notes: [] },
        { value: 9, notes: [] },
        { value: null, notes: [] },
        { value: null, notes: [] },
        { value: 2, notes: [] },
        { value: 1, notes: [] },
        { value: 5, notes: [] },
        { value: 4, notes: [] },
        { value: null, notes: [] }
    ],
    [
        { value: 4, notes: [] },
        { value: 6, notes: [] },
        { value: 5, notes: [] },
        { value: 9, notes: [] },
        { value: 8, notes: [] },
        { value: null, notes: [] },
        { value: 2, notes: [] },
        { value: 1, notes: [] },
        { value: null, notes: [] }
    ],
    [
        { value: null, notes: [] },
        { value: null, notes: [] },
        { value: 6, notes: [] },
        { value: null, notes: [] },
        { value: null, notes: [] },
        { value: 8, notes: [] },
        { value: 1, notes: [] },
        { value: 2, notes: [] },
        { value: null, notes: [] }
    ],
    [
        { value: null, notes: [] },
        { value: 7, notes: [] },
        { value: 9, notes: [] },
        { value: null, notes: [] },
        { value: 1, notes: [] },
        { value: null, notes: [] },
        { value: null, notes: [] },
        { value: 3, notes: [] },
        { value: 5, notes: [] }
    ],
    [
        { value: 2, notes: [] },
        { value: 4, notes: [] },
        { value: 1, notes: [] },
        { value: 5, notes: [] },
        { value: 6, notes: [] },
        { value: null, notes: [] },
        { value: null, notes: [] },
        { value: 8, notes: [] },
        { value: 7, notes: [] }
    ]
]
export const easySolvedPuzzle: IBoard = {
    current: easyInitialState,
    solved: solveBoard(easyInitialState).board
}

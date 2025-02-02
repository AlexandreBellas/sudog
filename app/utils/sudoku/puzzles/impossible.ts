import { IBoard } from "@/@types/board"

const impossibleInitialState = [
    [
        { value: 6, notes: [], isClue: true },
        { value: 6, notes: [], isClue: true },
        { value: 4, notes: [], isClue: true },
        { value: 8, notes: [], isClue: true },
        { value: null, notes: [], isClue: false },
        { value: 9, notes: [], isClue: true },
        { value: 6, notes: [], isClue: true },
        { value: 5, notes: [], isClue: true },
        { value: 1, notes: [], isClue: true }
    ],
    [
        { value: 9, notes: [], isClue: true },
        { value: 6, notes: [], isClue: true },
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
export const impossiblePuzzle: IBoard = {
    current: impossibleInitialState,
    solved: impossibleInitialState.map((row) => row.map((tile) => ({ ...tile, value: tile.value! })))
}

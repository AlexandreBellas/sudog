import { ITile } from "@/@types/tile"
import { isBoardInValidState } from "./is-board-in-valid-state"

const validBoard: ITile[][] = [
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

const invalidBoardWithDuplicatesInRow: ITile[][] = [
    [
        { value: 6, notes: [] },
        { value: 1, notes: [] },
        { value: 4, notes: [] },
        { value: 8, notes: [] },
        { value: 1, notes: [] },
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

const invalidBoardWithDuplicatesInColumn: ITile[][] = [
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
        { value: 6, notes: [] },
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

const invalidBoardWithDuplicatesInBlock: ITile[][] = [
    [
        { value: 6, notes: [] },
        { value: null, notes: [] },
        { value: 4, notes: [] },
        { value: 8, notes: [] },
        { value: null, notes: [] },
        { value: 9, notes: [] },
        { value: 1, notes: [] },
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

describe("isBoardInValidState", () => {
    it("should return true if the board is valid", () => {
        expect(isBoardInValidState(validBoard)).toBe(true)
    })

    it("should return false if the board is invalid with duplicates in a row", () => {
        expect(isBoardInValidState(invalidBoardWithDuplicatesInRow)).toBe(false)
    })

    it("should return false if the board is invalid with duplicates in a column", () => {
        expect(isBoardInValidState(invalidBoardWithDuplicatesInColumn)).toBe(false)
    })

    it("should return false if the board is invalid with duplicates in a block", () => {
        expect(isBoardInValidState(invalidBoardWithDuplicatesInBlock)).toBe(false)
    })
})

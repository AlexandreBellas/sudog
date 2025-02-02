import { ITile } from "@/@types/tile"
import { isBoardInValidState } from "./is-board-in-valid-state"

const validBoard: ITile[][] = [
    [
        { value: 6 },
        { value: null },
        { value: 4 },
        { value: 8 },
        { value: null },
        { value: 9 },
        { value: null },
        { value: 5 },
        { value: 1 }
    ],
    [
        { value: 9 },
        { value: null },
        { value: 7 },
        { value: null },
        { value: 3 },
        { value: null },
        { value: 4 },
        { value: null },
        { value: 2 }
    ],
    [
        { value: 5 },
        { value: 1 },
        { value: null },
        { value: null },
        { value: null },
        { value: 6 },
        { value: null },
        { value: 9 },
        { value: null }
    ],
    [
        { value: 1 },
        { value: null },
        { value: 2 },
        { value: 6 },
        { value: null },
        { value: 4 },
        { value: 8 },
        { value: null },
        { value: null }
    ],
    [
        { value: 7 },
        { value: 9 },
        { value: null },
        { value: null },
        { value: 2 },
        { value: 1 },
        { value: 5 },
        { value: 4 },
        { value: null }
    ],
    [
        { value: 4 },
        { value: 6 },
        { value: 5 },
        { value: 9 },
        { value: 8 },
        { value: null },
        { value: 2 },
        { value: 1 },
        { value: null }
    ],
    [
        { value: null },
        { value: null },
        { value: 6 },
        { value: null },
        { value: null },
        { value: 8 },
        { value: 1 },
        { value: 2 },
        { value: null }
    ],
    [
        { value: null },
        { value: 7 },
        { value: 9 },
        { value: null },
        { value: 1 },
        { value: null },
        { value: null },
        { value: 3 },
        { value: 5 }
    ],
    [
        { value: 2 },
        { value: 4 },
        { value: 1 },
        { value: 5 },
        { value: 6 },
        { value: null },
        { value: null },
        { value: 8 },
        { value: 7 }
    ]
]

const invalidBoardWithDuplicatesInRow: ITile[][] = [
    [
        { value: 6 },
        { value: 1 },
        { value: 4 },
        { value: 8 },
        { value: 1 },
        { value: 9 },
        { value: null },
        { value: 5 },
        { value: 1 }
    ],
    [
        { value: 9 },
        { value: null },
        { value: 7 },
        { value: null },
        { value: 3 },
        { value: null },
        { value: 4 },
        { value: null },
        { value: 2 }
    ],
    [
        { value: 5 },
        { value: 1 },
        { value: null },
        { value: null },
        { value: null },
        { value: 6 },
        { value: null },
        { value: 9 },
        { value: null }
    ],
    [
        { value: 1 },
        { value: null },
        { value: 2 },
        { value: 6 },
        { value: null },
        { value: 4 },
        { value: 8 },
        { value: null },
        { value: null }
    ],
    [
        { value: 7 },
        { value: 9 },
        { value: null },
        { value: null },
        { value: 2 },
        { value: 1 },
        { value: 5 },
        { value: 4 },
        { value: null }
    ],
    [
        { value: 4 },
        { value: 6 },
        { value: 5 },
        { value: 9 },
        { value: 8 },
        { value: null },
        { value: 2 },
        { value: 1 },
        { value: null }
    ],
    [
        { value: null },
        { value: null },
        { value: 6 },
        { value: null },
        { value: null },
        { value: 8 },
        { value: 1 },
        { value: 2 },
        { value: null }
    ],
    [
        { value: null },
        { value: 7 },
        { value: 9 },
        { value: null },
        { value: 1 },
        { value: null },
        { value: null },
        { value: 3 },
        { value: 5 }
    ],
    [
        { value: 2 },
        { value: 4 },
        { value: 1 },
        { value: 5 },
        { value: 6 },
        { value: null },
        { value: null },
        { value: 8 },
        { value: 7 }
    ]
]

const invalidBoardWithDuplicatesInColumn: ITile[][] = [
    [
        { value: 6 },
        { value: null },
        { value: 4 },
        { value: 8 },
        { value: null },
        { value: 9 },
        { value: null },
        { value: 5 },
        { value: 1 }
    ],
    [
        { value: 6 },
        { value: null },
        { value: 7 },
        { value: null },
        { value: 3 },
        { value: null },
        { value: 4 },
        { value: null },
        { value: 2 }
    ],
    [
        { value: 5 },
        { value: 1 },
        { value: null },
        { value: null },
        { value: null },
        { value: 6 },
        { value: null },
        { value: 9 },
        { value: null }
    ],
    [
        { value: 1 },
        { value: null },
        { value: 2 },
        { value: 6 },
        { value: null },
        { value: 4 },
        { value: 8 },
        { value: null },
        { value: null }
    ],
    [
        { value: 7 },
        { value: 9 },
        { value: null },
        { value: null },
        { value: 2 },
        { value: 1 },
        { value: 5 },
        { value: 4 },
        { value: null }
    ],
    [
        { value: 4 },
        { value: 6 },
        { value: 5 },
        { value: 9 },
        { value: 8 },
        { value: null },
        { value: 2 },
        { value: 1 },
        { value: null }
    ],
    [
        { value: null },
        { value: null },
        { value: 6 },
        { value: null },
        { value: null },
        { value: 8 },
        { value: 1 },
        { value: 2 },
        { value: null }
    ],
    [
        { value: null },
        { value: 7 },
        { value: 9 },
        { value: null },
        { value: 1 },
        { value: null },
        { value: null },
        { value: 3 },
        { value: 5 }
    ],
    [
        { value: 2 },
        { value: 4 },
        { value: 1 },
        { value: 5 },
        { value: 6 },
        { value: null },
        { value: null },
        { value: 8 },
        { value: 7 }
    ]
]

const invalidBoardWithDuplicatesInBlock: ITile[][] = [
    [
        { value: 6 },
        { value: null },
        { value: 4 },
        { value: 8 },
        { value: null },
        { value: 9 },
        { value: 1 },
        { value: 5 },
        { value: 1 }
    ],
    [
        { value: 9 },
        { value: null },
        { value: 7 },
        { value: null },
        { value: 3 },
        { value: null },
        { value: 4 },
        { value: null },
        { value: 2 }
    ],
    [
        { value: 5 },
        { value: 1 },
        { value: null },
        { value: null },
        { value: null },
        { value: 6 },
        { value: null },
        { value: 9 },
        { value: null }
    ],
    [
        { value: 1 },
        { value: null },
        { value: 2 },
        { value: 6 },
        { value: null },
        { value: 4 },
        { value: 8 },
        { value: null },
        { value: null }
    ],
    [
        { value: 7 },
        { value: 9 },
        { value: null },
        { value: null },
        { value: 2 },
        { value: 1 },
        { value: 5 },
        { value: 4 },
        { value: null }
    ],
    [
        { value: 4 },
        { value: 6 },
        { value: 5 },
        { value: 9 },
        { value: 8 },
        { value: null },
        { value: 2 },
        { value: 1 },
        { value: null }
    ],
    [
        { value: null },
        { value: null },
        { value: 6 },
        { value: null },
        { value: null },
        { value: 8 },
        { value: 1 },
        { value: 2 },
        { value: null }
    ],
    [
        { value: null },
        { value: 7 },
        { value: 9 },
        { value: null },
        { value: 1 },
        { value: null },
        { value: null },
        { value: 3 },
        { value: 5 }
    ],
    [
        { value: 2 },
        { value: 4 },
        { value: 1 },
        { value: 5 },
        { value: 6 },
        { value: null },
        { value: null },
        { value: 8 },
        { value: 7 }
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

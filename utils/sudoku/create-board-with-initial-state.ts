import { IDifficultyLevel } from "@/@types/game";
import { ITile } from "@/@types/tile";
import { blockSize, boardSize } from "@/constants/game";
import { isBoardInValidState } from "./is-board-in-valid-state";
import { solveBoard } from "./solve-board";
import { createNewEmptyBoard } from "./create-new-empty-board";

function generateRandomPosition() {
    return {
        i: Math.round(Math.random() * blockSize * boardSize),
        j: Math.round(Math.random() * blockSize * boardSize)
    }
}

function generateRandomValue() {
    return Math.round(Math.random() * (blockSize * blockSize - 1)) + 1
}

export function createBoardWithInitialState(level: IDifficultyLevel): ITile[][] {
    let numOfStartingTiles = 0

    switch (level) {
        case "easy": {
            numOfStartingTiles = 30
            break
        }
        case "medium": {
            numOfStartingTiles = 25
            break
        }
        case "hard": {
            numOfStartingTiles = 20
            break
        }
        case "expert": {
            numOfStartingTiles = 15
            break
        }
    }

    // Keeps trying to find a solvable board
    // @TODO: add more distribution to the numbers instead of relying on pure random insertion
    while (true) {
        const board = createNewEmptyBoard()

        for (let tileIdx = 0; tileIdx < numOfStartingTiles; tileIdx++) {
            let hasBeenInserted = false

            while (!hasBeenInserted) {
                const { i, j } = generateRandomPosition()
                if (board[i][j].value === null) {
                    board[i][j].value = generateRandomValue()

                    if (isBoardInValidState(board)) hasBeenInserted = true
                    else board[i][j].value = null
                }
            }
        }

        const { hasBeenSolved } = solveBoard(board)
        if (hasBeenSolved) return board
    }
}
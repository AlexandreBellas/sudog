import { IDifficultyLevel } from "@/@types/game"
import { ITile } from "@/@types/tile"
import { deepCopy } from "@/utils/deep-copy"
import { createBoardWithInitialState } from "@/utils/sudoku/create-board-with-initial-state"
import { isBoardInValidState } from "@/utils/sudoku/is-board-in-valid-state"
import { isTileValueValid } from "@/utils/sudoku/is-tile-value-valid"
import { solveBoard } from "@/utils/sudoku/solve-board"
import { createContext, useContext, useReducer } from "react"

// #region Type definitions
interface GameProviderProps {
    children: React.ReactNode
}

interface GameContextState {
    level: IDifficultyLevel
    board: ITile[][]
    isBoardStateValid: boolean
    selectedTilePosition?: {
        i: number
        j: number
    }
    boardHistory: ({
        i: number
        j: number
    } & ({
        type: "value"
        value: number
        previousValue: number | null
    } | {
        type: "note"
        value: number[]
        previousValue: number[]
    }))[]
}

type GameContextAction = {
    type: "start-game"
    level?: IDifficultyLevel
} | {
    type: "select-tile"
    i: number
    j: number
} | {
    type: "undo-last-action"
} | {
    type: "set-value-for-selected-tile"
    value: number
} | {
    type: "toggle-note-for-selected-tile"
    note: number
}
// #endregion

// #region Context definitions
const GameContext = createContext(
    {} as GameContextState
)
const GameContextDispatch = createContext(
    {} as React.Dispatch<GameContextAction>
)
// #endregion

// #region Hook definitions
export function useGame() {
    return useContext(GameContext)
}

export function useGameDispatch() {
    return useContext(GameContextDispatch)
}
// #endregion

// #region Util functions
function createNewBoard(level: IDifficultyLevel, isTest = false): ITile[][] {
    const board = createBoardWithInitialState(level)

    if (isTest) solveBoard(board)

    return board
}
// #endregion

// #region Provider definition
export default function GameProvider({
    children
}: Readonly<GameProviderProps>) {
    const initialState: GameContextState = {
        level: "easy",
        board: createNewBoard("easy"),
        isBoardStateValid: true,
        boardHistory: []
    }

    const [state, dispatch] = useReducer(GameReducer, initialState)

    return (
        <GameContext.Provider value={state}>
            <GameContextDispatch.Provider value={dispatch}>
                {children}
            </GameContextDispatch.Provider>
        </GameContext.Provider>
    )
}
// #endregion

// #region Reducer definition
function GameReducer(
    state: GameContextState,
    action: GameContextAction
): GameContextState {
    switch (action.type) {
        case "start-game": {
            return {
                ...state,
                board: createNewBoard(action.level ?? state.level)
            }
        }
        case "select-tile": {
            return {
                ...state,
                selectedTilePosition: { i: action.i, j: action.j }
            }
        }
        case "undo-last-action": {
            if (state.boardHistory.length === 0) return state

            const newHistory = [...state.boardHistory]
            const lastStep = newHistory.pop()

            if (!lastStep) return state

            const newBoard = deepCopy(state.board)
            if (lastStep.type === "value") {
                newBoard[lastStep.i][lastStep.j].value = lastStep.previousValue
            } else {
                newBoard[lastStep.i][lastStep.j].notes = lastStep.previousValue
            }

            return {
                ...state,
                board: newBoard,
                boardHistory: newHistory
            }
        }
        case "set-value-for-selected-tile": {
            if (!state.selectedTilePosition || !isTileValueValid(action.value)) return state

            const newBoard = deepCopy(state.board)
            const { i, j } = state.selectedTilePosition

            newBoard[i][j].value = action.value

            return {
                ...state,
                boardHistory: [...state.boardHistory, {
                    i,
                    j,
                    type: "value",
                    value: action.value,
                    previousValue: state.board[i][j].value
                }],
                board: newBoard,
                isBoardStateValid: isBoardInValidState(newBoard)
            }
        }
        case "toggle-note-for-selected-tile": {
            if (!state.selectedTilePosition || !isTileValueValid(action.note)) return state

            const newBoard = deepCopy(state.board)
            const { i, j } = state.selectedTilePosition

            const noteIdx = newBoard[i][j].notes.findIndex(n => n === action.note)
            if (noteIdx !== -1) {
                newBoard[i][j].notes.splice(noteIdx, 1)
            } else {
                newBoard[i][j].notes.push(action.note)
            }

            return {
                ...state,
                boardHistory: [...state.boardHistory, {
                    i,
                    j,
                    type: "note",
                    value: newBoard[i][j].notes,
                    previousValue: state.board[i][j].notes
                }],
                board: newBoard
            }
        }
        default: {
            return state
        }
    }
}
// #endregion
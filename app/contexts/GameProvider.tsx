import { IBoard } from "@/@types/board"
import { IDifficultyLevel } from "@/@types/game"
import { IPlayableTile, ITile } from "@/@types/tile"
import { useBoardService } from "@/hooks/services/useBoardService"
import { deepCopy } from "@/utils/deep-copy"
import { createBoardTest } from "@/utils/sudoku/create-board-test"
import { createBoardWithInitialState } from "@/utils/sudoku/create-board-with-initial-state"
import { isBoardFull } from "@/utils/sudoku/is-board-full"
import { isTileValueValid } from "@/utils/sudoku/is-tile-value-valid"
import { createContext, useContext, useEffect, useReducer } from "react"

// #region Type definitions
export interface IInitialBoardProps {
    board: IPlayableTile[][]
    solvedBoard: ITile<number>[][]
}

interface GameProviderProps {
    children: React.ReactNode
    initialBoard?: IInitialBoardProps
}

interface GameContextState {
    level: IDifficultyLevel
    board: IPlayableTile[][]
    solvedBoard: ITile<number>[][]
    selectedTilePosition?: {
        i: number
        j: number
    }
    isAddingNotes: boolean
    boardHistory: ({
        i: number
        j: number
    } & (
        | {
              type: "value"
              value: number
              previousValue: number | null
          }
        | {
              type: "note"
              value: number[]
              previousValue: number[]
          }
    ))[]
}

type GameContextAction =
    | {
          type: "start-game"
          level?: IDifficultyLevel
      }
    | {
          type: "select-tile"
          i: number
          j: number
      }
    | {
          type: "undo-last-action"
      }
    | {
          type: "set-value-for-selected-tile"
          value: number
      }
    | {
          type: "clear-value-for-selected-tile"
      }
    | {
          type: "toggle-note-for-selected-tile"
          note: number
      }
    | {
          type: "clear-all-notes-for-selected-tile"
      }
    | {
          type: "toggle-notes-mode"
      }
// #endregion

// #region Context definitions
const GameContext = createContext({} as GameContextState)
const GameContextDispatch = createContext({} as React.Dispatch<GameContextAction>)
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
function createNewBoard(level: IDifficultyLevel, isTest = false): IBoard {
    if (isTest) return createBoardTest(level)

    return createBoardWithInitialState(level)
}
// #endregion

// #region Provider definition
export default function GameProvider({ children, initialBoard }: Readonly<GameProviderProps>) {
    // #region Services
    const { boardGateway } = useBoardService()
    // #endregion

    // #region Provider state
    const initialState: GameContextState = {
        level: "easy",
        board: [],
        solvedBoard: [],
        boardHistory: [],
        isAddingNotes: false
    }

    const [state, dispatch] = useReducer(GameReducer, initialState, (state) => {
        if (initialBoard) return { ...state, ...initialBoard }

        const { current: board, solved: solvedBoard } = createNewBoard("easy", true)
        return { ...state, board, solvedBoard }
    })
    // #endregion

    // #region Effects
    useEffect(() => {
        if (isBoardFull(state.board)) {
            boardGateway.clearBoard()
            return
        }

        boardGateway.saveBoard({ board: state.board, solvedBoard: state.solvedBoard })
    }, [state.board, boardGateway, state.solvedBoard])
    // #endregion

    return (
        <GameContext.Provider value={state}>
            <GameContextDispatch.Provider value={dispatch}>{children}</GameContextDispatch.Provider>
        </GameContext.Provider>
    )
}
// #endregion

// #region Reducer definition
function GameReducer(state: GameContextState, action: GameContextAction): GameContextState {
    switch (action.type) {
        case "start-game": {
            const { current: board, solved: solvedBoard } = createNewBoard(action.level ?? state.level)
            return { ...state, board, solvedBoard }
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

            return { ...state, board: newBoard, boardHistory: newHistory }
        }
        case "set-value-for-selected-tile": {
            if (!state.selectedTilePosition || !isTileValueValid(action.value)) return state

            const newBoard = deepCopy(state.board)
            const { i, j } = state.selectedTilePosition

            newBoard[i][j].value = action.value

            return {
                ...state,
                boardHistory: [
                    ...state.boardHistory,
                    {
                        i,
                        j,
                        type: "value",
                        value: action.value,
                        previousValue: state.board[i][j].value
                    }
                ],
                board: newBoard
            }
        }
        case "clear-value-for-selected-tile": {
            if (!state.selectedTilePosition) return state
            if (state.board[state.selectedTilePosition.i][state.selectedTilePosition.j].isClue) return state

            const newBoard = deepCopy(state.board)
            const { i, j } = state.selectedTilePosition

            newBoard[i][j].value = null

            return { ...state, board: newBoard }
        }
        case "toggle-note-for-selected-tile": {
            if (!state.selectedTilePosition || !isTileValueValid(action.note)) return state

            const newBoard = deepCopy(state.board)
            const { i, j } = state.selectedTilePosition

            const noteIdx = newBoard[i][j].notes.findIndex((n) => n === action.note)
            if (noteIdx !== -1) {
                newBoard[i][j].notes.splice(noteIdx, 1)
            } else {
                newBoard[i][j].notes.push(action.note)
            }

            return {
                ...state,
                boardHistory: [
                    ...state.boardHistory,
                    {
                        i,
                        j,
                        type: "note",
                        value: newBoard[i][j].notes,
                        previousValue: state.board[i][j].notes
                    }
                ],
                board: newBoard
            }
        }
        case "clear-all-notes-for-selected-tile": {
            if (!state.selectedTilePosition) return state

            const newBoard = deepCopy(state.board)
            const { i, j } = state.selectedTilePosition

            newBoard[i][j].notes = []

            return { ...state, board: newBoard }
        }
        case "toggle-notes-mode": {
            return { ...state, isAddingNotes: !state.isAddingNotes }
        }
        default: {
            return state
        }
    }
}
// #endregion

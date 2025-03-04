import { IAction } from "@/@types/action"
import { IBoard } from "@/@types/board"
import { IDifficultyLevel, IFeatureFlag } from "@/@types/game"
import { IPlayableTile, ITile } from "@/@types/tile"
import { blockSize, boardSize } from "@/constants/game"
import { useBoardService } from "@/hooks/services/useBoardService"
import { ISaveableBoard } from "@/services/IBoardGateway"
import { deepCopy } from "@/utils/deep-copy"
import { createBoardTest } from "@/utils/sudoku/create-board-test"
import { createBoardWithInitialState } from "@/utils/sudoku/create-board-with-initial-state"
import { isBoardMatchingSolved } from "@/utils/sudoku/is-board-matching-solved"
import { isTileValueValid } from "@/utils/sudoku/is-tile-value-valid"
import { parseMatrixToSolvableBoard } from "@/utils/sudoku/parse-matrix-to-solvable-board"
import { SingleOrArray } from "@/utils/types/single-or-array"
import { createContext, useContext, useEffect, useMemo, useReducer } from "react"

// #region Type definitions
export type IInitialBoardProps = ISaveableBoard

interface GameProviderProps {
    children: React.ReactNode
    initialBoard?: IInitialBoardProps
}

interface GameContextState {
    level: IDifficultyLevel
    board: IPlayableTile[][]
    solvedBoard: ITile<number>[][]
    isBoardSolved: boolean
    selectedTilePosition?: {
        i: number
        j: number
    }
    isAddingNotes: boolean
    boardHistory: IAction[]
    isReloadingBoard: boolean
    selectedTileValue: number | null
    errorsCount: number
    isGameOver: boolean
    featureFlags: { [key in IFeatureFlag]: boolean }
}

type GameContextAction =
    | {
          type: "start-game"
          level: IDifficultyLevel
          board: (number | null)[][]
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
    | {
          type: "mark-as-reloading-board"
          isReloadingBoard: boolean
      }
    | {
          type: "set-feature-flag"
          payload: SingleOrArray<{
              featureFlag: IFeatureFlag
              value: boolean
          }>
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

function calculateIsGameOver(state: GameContextState): boolean {
    return state.errorsCount >= 3
}
// #endregion

// #region Provider definition
export default function GameProvider({ children, initialBoard }: Readonly<GameProviderProps>) {
    // #region Services
    const boardGateway = useBoardService()
    // #endregion

    // #region Provider state
    const initialState: GameContextState = {
        level: "easy",
        board: [],
        solvedBoard: [],
        boardHistory: [],
        isAddingNotes: false,
        isBoardSolved: false,
        isReloadingBoard: false,
        selectedTileValue: null,
        errorsCount: 0,
        isGameOver: false,
        featureFlags: {
            notes: true,
            dogs: true,
            errors: true
        }
    }

    const [rawState, dispatch] = useReducer(GameReducer, initialState, (state) => {
        if (initialBoard) {
            const newState: GameContextState = {
                ...state,
                board: initialBoard.board,
                solvedBoard: initialBoard.solvedBoard,
                boardHistory: initialBoard.history,
                level: initialBoard.level,
                errorsCount: initialBoard.errorsCount ?? 0
            }

            return { ...newState, isGameOver: calculateIsGameOver(newState) }
        }

        const { current: board, solved: solvedBoard } = createNewBoard("easy", true)
        const newState: GameContextState = { ...state, board, solvedBoard }
        return { ...newState, isGameOver: calculateIsGameOver(newState) }
    })
    // #endregion

    // #region Memos
    const selectedTileValue = useMemo(() => {
        if (!rawState.selectedTilePosition) return null

        return rawState.board[rawState.selectedTilePosition.i][rawState.selectedTilePosition.j].value
    }, [rawState.selectedTilePosition, rawState.board])

    const state = useMemo(() => ({ ...rawState, selectedTileValue }), [rawState, selectedTileValue])
    // #endregion

    // #region Effects
    useEffect(() => {
        if (state.isBoardSolved) {
            console.debug("Board cleared")
            boardGateway.clearBoard()
            return
        }

        console.debug("Board saved")

        boardGateway.saveBoard({
            board: state.board,
            solvedBoard: state.solvedBoard,
            history: state.boardHistory,
            level: state.level,
            errorsCount: state.errorsCount
        })
    }, [
        state.isBoardSolved,
        state.board,
        boardGateway,
        state.solvedBoard,
        state.boardHistory,
        state.level,
        state.errorsCount
    ])
    // #endregion

    return (
        <GameContext.Provider value={state}>
            <GameContextDispatch.Provider value={dispatch}>{children}</GameContextDispatch.Provider>
        </GameContext.Provider>
    )
}
// #endregion

// #region Reducer definition
const allowedActionsAfterGameOver = [
    "start-game",
    "mark-as-reloading-board",
    "select-tile"
] as GameContextAction["type"][]
function GameReducer(state: GameContextState, action: GameContextAction): GameContextState {
    if (state.isGameOver && !allowedActionsAfterGameOver.includes(action.type)) return state

    switch (action.type) {
        case "start-game": {
            const board = parseMatrixToSolvableBoard(action.board, action.level)

            return {
                ...state,
                board: board.board,
                solvedBoard: board.solvedBoard,
                level: action.level,
                boardHistory: [],
                isAddingNotes: false,
                selectedTilePosition: undefined,
                isBoardSolved: false,
                errorsCount: 0,
                isGameOver: false
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
                boardHistory: newHistory,
                isBoardSolved: isBoardMatchingSolved({ current: newBoard, solved: state.solvedBoard })
            }
        }
        case "set-value-for-selected-tile": {
            if (!state.selectedTilePosition || !isTileValueValid(action.value)) return state

            const newBoard = deepCopy(state.board)
            const { i, j } = state.selectedTilePosition
            let errorsCount = state.errorsCount

            if (state.isAddingNotes) {
                if (newBoard[i][j].notes.includes(action.value)) {
                    newBoard[i][j].notes.splice(newBoard[i][j].notes.indexOf(action.value), 1)
                } else {
                    newBoard[i][j].notes.push(action.value)
                }
            } else {
                newBoard[i][j].value = action.value

                // Clear relevant notes
                if (state.solvedBoard[i][j].value === action.value) {
                    for (let k = 0; k < blockSize * boardSize; k++) {
                        // Same row
                        newBoard[k][j].notes = newBoard[k][j].notes.filter((n) => n !== action.value)
                        // Same column
                        newBoard[i][k].notes = newBoard[i][k].notes.filter((n) => n !== action.value)
                    }

                    // Same block
                    const blockIShift = Math.floor(i / blockSize) * blockSize
                    const blockJShift = Math.floor(j / blockSize) * blockSize
                    for (let k = 0; k < blockSize; k++) {
                        for (let l = 0; l < blockSize; l++) {
                            const tile = newBoard[blockIShift + k][blockJShift + l]
                            tile.notes = tile.notes.filter((n) => n !== action.value)
                        }
                    }
                }
                // Mark as error (only if errors feature flag is enabled)
                else if (state.featureFlags.errors) {
                    errorsCount++
                }
            }

            const newState: GameContextState = {
                ...state,
                boardHistory: [
                    ...state.boardHistory,
                    {
                        i,
                        j,
                        ...(state.isAddingNotes
                            ? {
                                  type: "note",
                                  value: newBoard[i][j].notes,
                                  previousValue: state.board[i][j].notes
                              }
                            : {
                                  type: "value",
                                  value: action.value,
                                  previousValue: state.board[i][j].value
                              })
                    }
                ],
                board: newBoard,
                isBoardSolved: !state.isAddingNotes
                    ? isBoardMatchingSolved({ current: newBoard, solved: state.solvedBoard })
                    : state.isBoardSolved,
                errorsCount
            }

            return {
                ...newState,
                isGameOver: calculateIsGameOver(newState)
            }
        }
        case "clear-value-for-selected-tile": {
            if (!state.selectedTilePosition) return state
            if (state.board[state.selectedTilePosition.i][state.selectedTilePosition.j].isClue) return state

            const newBoard = deepCopy(state.board)
            const { i, j } = state.selectedTilePosition

            newBoard[i][j].value = null

            return {
                ...state,
                board: newBoard,
                isBoardSolved: isBoardMatchingSolved({ current: newBoard, solved: state.solvedBoard })
            }
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
        case "mark-as-reloading-board": {
            return { ...state, isReloadingBoard: action.isReloadingBoard }
        }
        case "set-feature-flag": {
            const payload = Array.isArray(action.payload) ? action.payload : [action.payload]
            const newFeatureFlags = payload.reduce((acc, curr) => {
                acc[curr.featureFlag] = curr.value
                return acc
            }, state.featureFlags)

            return { ...state, featureFlags: newFeatureFlags }
        }
        default: {
            return state
        }
    }
}
// #endregion

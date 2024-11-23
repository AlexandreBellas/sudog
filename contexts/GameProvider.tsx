import { boardSize, blockSize } from "@/constants/game"
import { createContext, useContext, useReducer } from "react"

// #region Type definitions
interface GameProviderProps {
    children: React.ReactNode
}

interface GameContextState {
    board: ITile[][]
    selectedTilePosition?: {
        i: number
        j: number
    }
}

type GameContextAction = {
    type: "start-game"
} | {
    type: "select-tile"
    i: number
    j: number
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
function createNewBoard(isTest = false): ITile[][] {
    const board: ITile[][] = []

    for (let i = 0; i < boardSize * blockSize; i++) {
        const row: ITile[] = []
        for (let j = 0; j < boardSize * blockSize; j++) {
            row.push({ value: null })
        }

        board.push(row)
    }

    if (isTest) solve(board)

    return board
}

function solve(board: ITile[][]) {
    return board
}
// #endregion

// #region Provider definition
export default function GameProvider({
    children
}: Readonly<GameProviderProps>) {
    const initialState: GameContextState = {
        board: createNewBoard()
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
                board: createNewBoard()
            }
        }
        case "select-tile": {
            return {
                ...state,
                selectedTilePosition: { i: action.i, j: action.j }
            }
        }
        default: {
            return state
        }
    }
}
// #endregion
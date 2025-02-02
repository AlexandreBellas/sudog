import { IDifficultyLevel } from "@/@types/game"
import { useGame, useGameDispatch } from "@/contexts/GameProvider"
import { useCallback, useMemo } from "react"
import { useBoardService } from "./services/useBoardService"

interface IUseStartNewGameProps {
    level?: IDifficultyLevel
}

export function useStartNewGame({ level }: Readonly<IUseStartNewGameProps> = {}) {
    // #region Contexts
    const { level: currLevel } = useGame()
    const gameDispatch = useGameDispatch()
    // #endregion

    // #region Services
    const boardGateway = useBoardService()
    // #endregion

    // #region Memos
    const actualLevel = useMemo(() => level ?? currLevel, [level, currLevel])
    // #endregion

    // #region Callbacks
    const handleStartNewGame = useCallback(
        (level?: IDifficultyLevel) =>
            boardGateway
                .clearBoard()
                .then(() => boardGateway.newRandomBoard({ level: level ?? actualLevel }))
                .then((board) => {
                    gameDispatch({ type: "start-game", board: board.content, level: level ?? actualLevel })
                })
                .catch((error) => {
                    console.error(error)
                }),
        [boardGateway, gameDispatch, actualLevel]
    )
    // #endregion

    return { handleStartNewGame }
}

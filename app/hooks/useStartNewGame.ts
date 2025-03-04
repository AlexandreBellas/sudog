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

    const handleAskUserToRestartBoard = useCallback(
        (message?: string) => {
            if (!confirm(message ?? "Are you sure you want to restart? Your current progress will be lost. 🦴")) return

            gameDispatch({ type: "mark-as-reloading-board", isReloadingBoard: true })
            handleStartNewGame().finally(() =>
                gameDispatch({ type: "mark-as-reloading-board", isReloadingBoard: false })
            )
        },
        [gameDispatch, handleStartNewGame]
    )
    // #endregion

    return { handleStartNewGame, handleAskUserToRestartBoard }
}

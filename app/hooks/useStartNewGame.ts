import { useGame, useGameDispatch } from "@/contexts/GameProvider"
import { useCallback } from "react"
import { useBoardService } from "./services/useBoardService"

export function useStartNewGame() {
    // #region Contexts
    const { level } = useGame()
    const gameDispatch = useGameDispatch()
    // #endregion

    // #region Services
    const boardGateway = useBoardService()
    // #endregion

    // #region Callbacks
    const handleStartNewGame = useCallback(
        () =>
            boardGateway
                .clearBoard()
                .then(() => boardGateway.newRandomBoard({ level }))
                .then((board) => {
                    gameDispatch({ type: "start-game", board: board.content, level })
                }),
        [boardGateway, gameDispatch, level]
    )
    // #endregion

    return { handleStartNewGame }
}

import { blockSize, boardSize, loseTimeoutDelayMs, winTimeoutDelayMs } from "@/constants/game"
import { useGame, useGameDispatch } from "@/contexts/GameProvider"
import { useStartNewGame } from "@/hooks/useStartNewGame"
import { useCallback, useEffect } from "react"
import { Box } from "../ui/box"
import { Grid, GridItem } from "../ui/grid"
import ActionButtons from "./components/ActionButtons"
import Block from "./components/Block"
import Header from "./components/Header"

export default function Board() {
    // #region Contexts
    const { isBoardSolved, isReloadingBoard, errorsCount } = useGame()
    const gameDispatch = useGameDispatch()
    // #endregion

    // #region Game
    const { handleStartNewGame } = useStartNewGame()
    // #endregion

    // #region Callbacks
    const handleClearSelectedTile = useCallback(() => {
        gameDispatch({ type: "clear-value-for-selected-tile" })
    }, [gameDispatch])
    // #endregion

    // #region Effects

    // onRenderAddKeyPressListener
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const key = event.key
            if (!isNaN(Number(key)) && key >= "1" && key <= "9") {
                gameDispatch({ type: "set-value-for-selected-tile", value: parseInt(key) })
            }

            if (event.key === "Backspace") {
                handleClearSelectedTile()
            }
        }

        window.addEventListener("keydown", handleKeyPress)

        return () => window.removeEventListener("keydown", handleKeyPress)
    }, [handleClearSelectedTile, gameDispatch])

    // onBoardSolvedShowWinningConditionAlert
    useEffect(() => {
        if (!isBoardSolved) return

        setTimeout(() => {
            if (!confirm("Woof woof! You did it! 🐶🎉 Do you want to start a new game?")) return

            gameDispatch({ type: "mark-as-reloading-board", isReloadingBoard: true })
            handleStartNewGame().finally(() =>
                gameDispatch({ type: "mark-as-reloading-board", isReloadingBoard: false })
            )
        }, winTimeoutDelayMs)
    }, [isBoardSolved, handleStartNewGame, gameDispatch])

    // onThreeErrorsShowLoseConditionAlert
    useEffect(() => {
        if (errorsCount < 3) return

        setTimeout(() => {
            if (!confirm("🧟🧟🧟 Rawr rawr! You lost 💀 Do you want to start again?")) return

            gameDispatch({ type: "mark-as-reloading-board", isReloadingBoard: true })
            handleStartNewGame().finally(() =>
                gameDispatch({ type: "mark-as-reloading-board", isReloadingBoard: false })
            )
        }, loseTimeoutDelayMs)
    }, [errorsCount, handleStartNewGame, gameDispatch])

    // #endregion

    return (
        <Box className={isReloadingBoard ? "opacity-50 pointer-events-none" : ""}>
            <Header />
            <Grid
                className="max-w-max gap-0.5 bg-gray-600 border-2 border-gray-600 aspect-square"
                _extra={{ className: "grid-cols-3" }}
            >
                {[...Array(boardSize).keys()].flatMap((i) =>
                    [...Array(blockSize).keys()].map((j) => (
                        <GridItem
                            key={`block-${i}-${j}`}
                            className="aspect-square"
                            _extra={{ className: "col-span-1" }}
                        >
                            <Block
                                iBlock={i}
                                jBlock={j}
                            />
                        </GridItem>
                    ))
                )}
            </Grid>
            <ActionButtons />
        </Box>
    )
}

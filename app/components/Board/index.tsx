import { blockSize, boardSize, winTimeoutDelayMs } from "@/constants/game"
import { useGame, useGameDispatch } from "@/contexts/GameProvider"
import { useStartNewGame } from "@/hooks/useStartNewGame"
import { EditIcon } from "lucide-react-native"
import { useCallback, useEffect, useState } from "react"
import { Box } from "../ui/box"
import { Button, ButtonIcon, ButtonText } from "../ui/button"
import { Grid, GridItem } from "../ui/grid"
import ActionButtons from "./components/ActionButtons"
import Block from "./components/Block"
import ChooseLevelModal from "./components/ChooseLevelModal"

export default function Board() {
    // #region Contexts
    const { isBoardSolved, level, isReloadingBoard } = useGame()
    const gameDispatch = useGameDispatch()
    // #endregion

    // #region Game
    const { handleStartNewGame } = useStartNewGame()
    // #endregion

    // #region States
    const [showChooseLevelModal, setShowChooseLevelModal] = useState(false)
    // #endregion

    // #region Callbacks
    const handleClearSelectedTile = useCallback(() => {
        gameDispatch({ type: "clear-value-for-selected-tile" })
    }, [gameDispatch])
    // #endregion

    // #region Effects
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
    // #endregion

    return (
        <Box className={isReloadingBoard ? "opacity-50 pointer-events-none" : ""}>
            <Box className="flex flex-row items-center gap-1 mb-1">
                <Button
                    onPress={() => setShowChooseLevelModal(true)}
                    variant="outline"
                    size="xs"
                >
                    <ButtonIcon as={EditIcon} />
                    <ButtonText>Level: {level}</ButtonText>
                </Button>
            </Box>
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
            <ChooseLevelModal
                showModal={showChooseLevelModal}
                setShowModal={setShowChooseLevelModal}
            />
        </Box>
    )
}

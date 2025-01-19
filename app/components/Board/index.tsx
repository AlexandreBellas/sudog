import { blockSize, boardSize } from "@/constants/game"
import { useGame, useGameDispatch } from "@/contexts/GameProvider"
import { Eraser, Pencil, PencilOff, Undo } from "lucide-react-native"
import { useCallback, useEffect } from "react"
import { Box } from "../ui/box"
import { Button, ButtonIcon, ButtonText } from "../ui/button"
import { Grid, GridItem } from "../ui/grid"
import { HStack } from "../ui/hstack"
import Block from "./components/Block"

export default function Board() {
    // #region Contexts
    const { isAddingNotes } = useGame()
    const gameDispatch = useGameDispatch()
    // #endregion

    // #region Callbacks
    const handleToggleNotesMode = useCallback(() => {
        gameDispatch({ type: "toggle-notes-mode" })
    }, [gameDispatch])

    const handleClearSelectedTile = useCallback(() => {
        gameDispatch({ type: "clear-value-for-selected-tile" })
    }, [gameDispatch])

    const handleUndoAction = useCallback(() => {
        gameDispatch({ type: "undo-last-action" })
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
    // #endregion

    return (
        <Box>
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
            <HStack className="py-2 justify-center">
                <Button
                    size="lg"
                    onPress={handleUndoAction}
                    className="flex flex-col"
                >
                    <ButtonIcon
                        as={Undo}
                        size="lg"
                    />
                    <ButtonText size="sm">Undo</ButtonText>
                </Button>
                <Button
                    size="lg"
                    onPress={handleClearSelectedTile}
                    className="flex flex-col"
                >
                    <ButtonIcon
                        as={Eraser}
                        size="lg"
                    />
                    <ButtonText size="sm">Clear</ButtonText>
                </Button>
                <Button
                    size="lg"
                    onPress={handleToggleNotesMode}
                    className="flex flex-col"
                >
                    <ButtonIcon
                        as={isAddingNotes ? Pencil : PencilOff}
                        size="lg"
                    />
                    <ButtonText size="sm">{isAddingNotes ? "Notes ON" : "Notes OFF"}</ButtonText>
                </Button>
            </HStack>
        </Box>
    )
}

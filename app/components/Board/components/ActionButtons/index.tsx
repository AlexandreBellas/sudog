import { Box } from "@/components/ui/box"
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button"
import { useGame, useGameDispatch } from "@/contexts/GameProvider"
import { useStartNewGame } from "@/hooks/useStartNewGame"
import { Eraser, Pencil, PencilOff, RefreshCcw, Undo } from "lucide-react-native"
import { useCallback } from "react"

export default function ActionButtons() {
    // #region Contexts
    const { isAddingNotes } = useGame()
    const gameDispatch = useGameDispatch()
    // #endregion

    // #region Game
    const { handleStartNewGame } = useStartNewGame()
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

    const handleRestartBoard = useCallback(() => {
        if (!confirm("Are you sure you want to restart? Your current progress will be lost. 🦴")) return

        gameDispatch({ type: "mark-as-reloading-board", isReloadingBoard: true })
        handleStartNewGame().finally(() => gameDispatch({ type: "mark-as-reloading-board", isReloadingBoard: false }))
    }, [handleStartNewGame, gameDispatch])
    // #endregion

    return (
        <Box className="flex flex-row py-2 justify-center">
            <Button
                size="lg"
                onPress={handleUndoAction}
                className="flex flex-col px-2"
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
                className="flex flex-col px-2"
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
                className="flex flex-col px-2"
            >
                <ButtonIcon
                    as={isAddingNotes ? Pencil : PencilOff}
                    size="lg"
                />
                <ButtonText size="sm">{isAddingNotes ? "Notes ON" : "Notes OFF"}</ButtonText>
            </Button>
            <Button
                size="lg"
                onPress={handleRestartBoard}
                className="flex flex-col px-2"
            >
                <ButtonIcon
                    as={RefreshCcw}
                    size="lg"
                />
                <ButtonText size="sm">Restart</ButtonText>
            </Button>
        </Box>
    )
}

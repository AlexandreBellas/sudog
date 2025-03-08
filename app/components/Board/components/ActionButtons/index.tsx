import { Box } from "@/components/ui/box"
import { useGame, useGameDispatch } from "@/contexts/GameProvider"
import { useStartNewGame } from "@/hooks/useStartNewGame"
import { Eraser, Pencil, PencilOff, RefreshCcw, Undo } from "lucide-react-native"
import { useCallback } from "react"
import ActionButton from "./components/ActionButton"

export default function ActionButtons() {
    // #region Contexts
    const {
        isAddingNotes,
        config: { featureFlags }
    } = useGame()
    const gameDispatch = useGameDispatch()
    // #endregion

    // #region Game
    const { handleAskUserToRestartBoard } = useStartNewGame()
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

    return (
        <Box className="flex flex-row gap-1 py-2 justify-center">
            <ActionButton
                icon={Undo}
                onPress={handleUndoAction}
                text="Undo"
            />
            <ActionButton
                icon={Eraser}
                onPress={handleClearSelectedTile}
                text="Clear"
            />
            {featureFlags.notes && (
                <ActionButton
                    icon={isAddingNotes ? Pencil : PencilOff}
                    onPress={handleToggleNotesMode}
                    text={isAddingNotes ? "Notes ON" : "Notes OFF"}
                />
            )}
            <ActionButton
                icon={RefreshCcw}
                onPress={() => handleAskUserToRestartBoard()}
                text="Restart"
            />
        </Box>
    )
}

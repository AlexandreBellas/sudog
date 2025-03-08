import { Box } from "@/components/ui/box"
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button"
import { useGame, useGameDispatch } from "@/contexts/GameProvider"
import { useStartNewGame } from "@/hooks/useStartNewGame"
import { Eraser, Pencil, PencilOff, RefreshCcw, Undo } from "lucide-react-native"
import { useCallback } from "react"

export default function ActionButtons() {
    // #region Contexts
    const { isAddingNotes, featureFlags } = useGame()
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
            <Button
                size="lg"
                onPress={handleUndoAction}
                className="flex flex-col px-2 bg-white data-[hover=true]:bg-white/80"
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
                className="flex flex-col px-2 bg-white data-[hover=true]:bg-white/80"
            >
                <ButtonIcon
                    as={Eraser}
                    size="lg"
                />
                <ButtonText size="sm">Clear</ButtonText>
            </Button>
            {featureFlags.notes && (
                <Button
                    size="lg"
                    onPress={handleToggleNotesMode}
                    className="flex flex-col px-2 bg-white data-[hover=true]:bg-white/80"
                >
                    <ButtonIcon
                        as={isAddingNotes ? Pencil : PencilOff}
                        size="lg"
                    />
                    <ButtonText size="sm">{isAddingNotes ? "Notes ON" : "Notes OFF"}</ButtonText>
                </Button>
            )}
            <Button
                size="lg"
                onPress={() => handleAskUserToRestartBoard()}
                className="flex flex-col px-2 bg-white data-[hover=true]:bg-white/80"
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

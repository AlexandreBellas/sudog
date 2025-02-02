import { Box } from "@/components/ui/box"
import { blockSize } from "@/constants/game"
import { useGame } from "@/contexts/GameProvider"
import TileNoteItem from "../TileNoteItem"

interface ITileNotesProps {
    notes: number[]
}

export default function TileNotes({ notes }: Readonly<ITileNotesProps>) {
    // #region Contexts
    const { selectedTileValue } = useGame()
    // #endregion

    return (
        <Box className="absolute inset-0 sm:p-1 pointer-events-none">
            <Box className="relative h-full">
                {Array.from({ length: blockSize * blockSize })
                    .map((_, i) => i + 1)
                    .filter((note) => notes.includes(note))
                    .map((note) => (
                        <TileNoteItem
                            key={note}
                            note={note}
                            isSelected={selectedTileValue === note}
                        />
                    ))}
            </Box>
        </Box>
    )
}

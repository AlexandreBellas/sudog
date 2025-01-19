import { Text } from "@/components/ui/text"
import { blockSize } from "@/constants/game"
import { useMemo } from "react"

interface ITileNoteItemProps {
    note: number
}

export default function TileNoteItem({ note }: Readonly<ITileNoteItemProps>) {
    // #region Memos
    const verticalLine = useMemo(() => Math.floor((note - 1) / blockSize), [note])
    const horizontalLine = useMemo(() => (note - 1) % blockSize, [note])

    const translateX = useMemo(() => -verticalLine * (100 / (blockSize - 1)), [verticalLine])
    const translateY = useMemo(() => -horizontalLine * (100 / (blockSize - 1)), [horizontalLine])
    // #endregion

    return (
        <Text
            className="absolute text-gray-600 text-xs"
            style={{
                top: `${verticalLine * (100 / (blockSize - 1))}%`,
                left: `${horizontalLine * (100 / (blockSize - 1))}%`,
                transform: `translate(${translateY}%, ${translateX}%)`,
                height: `${100 / blockSize}%`
            }}
        >
            {note}
        </Text>
    )
}

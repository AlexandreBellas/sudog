import { IPlayableTile } from "@/@types/tile"
import { Box } from "@/components/ui/box"
import { Button, ButtonGroup, ButtonText } from "@/components/ui/button"
import { Image } from "@/components/ui/image"
import { blockSize } from "@/constants/game"
import { useGame, useGameDispatch } from "@/contexts/GameProvider"
import { mapNumberToBackground } from "@/utils/dogs/map-number-to-background"
import { useCallback, useMemo } from "react"
import TileNotes from "../TileNotes"

interface ITileProps {
    correctValue: number
    value: IPlayableTile
    i: number
    j: number
}

export default function Tile({ correctValue, value, i, j }: Readonly<ITileProps>) {
    // #region Contexts
    const { board, selectedTilePosition } = useGame()
    const gameDispatch = useGameDispatch()
    // #endregion

    // #region Memos
    const iBlock = useMemo(() => Math.floor(i / blockSize), [i])
    const jBlock = useMemo(() => Math.floor(j / blockSize), [j])

    const tileState = useMemo(() => {
        if (!selectedTilePosition) return "none"

        if (selectedTilePosition?.i === i && selectedTilePosition?.j === j) return "selected"

        const selectedValue = board[selectedTilePosition.i][selectedTilePosition.j]?.value
        if (!selectedValue) return "none"

        if (selectedValue === value.value) return "indirectly-selected"

        return "none"
    }, [selectedTilePosition, i, j, board, value])
    const isOnRowOrColumnOrGridOfSelected = useMemo(
        () =>
            !!selectedTilePosition &&
            (selectedTilePosition.i === i ||
                selectedTilePosition.j === j ||
                (iBlock === Math.floor(selectedTilePosition.i / blockSize) &&
                    jBlock === Math.floor(selectedTilePosition.j / blockSize))),
        [selectedTilePosition, i, j, iBlock, jBlock]
    )
    const bgClassName = useMemo(() => {
        if (tileState === "selected") return "bg-blue-300"
        if (tileState === "indirectly-selected") return "bg-blue-200"
        if (isOnRowOrColumnOrGridOfSelected) return "bg-blue-100"

        return null
    }, [tileState, isOnRowOrColumnOrGridOfSelected])

    const isHighlighted = useMemo(() => tileState === "selected" || tileState === "indirectly-selected", [tileState])

    const isCorrect = useMemo(() => value.value === correctValue, [value.value, correctValue])
    // #endregion

    // #region Callbacks
    const handleSelectTile = useCallback(() => {
        gameDispatch({ type: "select-tile", i, j })
    }, [gameDispatch, i, j])
    // #endregion

    return (
        <Box className="relative">
            <ButtonGroup
                className={`${bgClassName ?? "bg-white"} aspect-square justify-center items-center box-content`}
            >
                <Button
                    onPress={handleSelectTile}
                    className="justify-center items-center h-full p-2 xs:p-3 sm:p-5 aspect-square relative"
                    data-hover={false}
                    isHovered={false}
                >
                    {value.value && (
                        <Image
                            source={mapNumberToBackground(value.value)}
                            className={`absolute inset-0 object-contain max-h-full
                                [clip-path:polygon(0_0,100%_0,100%_0,0_100%)]
                                [mask-image:linear-gradient(135deg,black_0%,transparent_62.5%)]
                                ${!isHighlighted ? "opacity-0" : "opacity-100"}
                            `}
                        />
                    )}
                    <ButtonText
                        className={`
                            text-2xl font-medium
                            ${value.value === null ? "invisible" : ""}
                            ${value.isClue ? "text-gray-950" : "text-blue-500 data-[hover=true]:text-blue-500"}
                            ${!isCorrect ? "text-red-500 data-[hover=true]:text-red-500" : ""}
                        `}
                        size={value.isClue ? "md" : "sm"}
                        data-hover={false}
                    >
                        {value.value ?? "0"}
                    </ButtonText>
                </Button>
            </ButtonGroup>
            {value.value === null && <TileNotes notes={value.notes} />}
        </Box>
    )
}

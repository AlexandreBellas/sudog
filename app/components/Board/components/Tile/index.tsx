import { IPlayableTile } from "@/@types/tile"
import { Button, ButtonGroup, ButtonText } from "@/components/ui/button"
import { blockSize } from "@/constants/game"
import { useGame, useGameDispatch } from "@/contexts/GameProvider"
import { useCallback, useMemo } from "react"

interface ITileProps {
    correctValue: number
    value: IPlayableTile
    i: number
    j: number
}

export default function Tile({ correctValue, value, i, j }: Readonly<ITileProps>) {
    // #region Contexts
    const { selectedTilePosition } = useGame()
    const gameDispatch = useGameDispatch()
    // #endregion

    // #region Memos
    const iBlock = useMemo(() => Math.floor(i / blockSize), [i])
    const jBlock = useMemo(() => Math.floor(j / blockSize), [j])

    const isSelected = useMemo(
        () => selectedTilePosition?.i === i && selectedTilePosition?.j === j,
        [selectedTilePosition, i, j]
    )
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
        if (isSelected) return "bg-blue-300"
        if (isOnRowOrColumnOrGridOfSelected) return "bg-blue-100"

        return null
    }, [isSelected, isOnRowOrColumnOrGridOfSelected])

    const isCorrect = useMemo(() => value.value === correctValue, [value.value, correctValue])
    // #endregion

    // #region Callbacks
    const handleSelectTile = useCallback(() => {
        gameDispatch({ type: "select-tile", i, j })
    }, [gameDispatch, i, j])
    // #endregion

    return (
        <ButtonGroup className={`${bgClassName ?? "bg-white"} aspect-square justify-center items-center box-content`}>
            <Button
                onPress={handleSelectTile}
                className="justify-center items-center"
                data-hover={false}
                isHovered={false}
            >
                <ButtonText
                    className={`
                        ${value.value === null ? "invisible" : ""}
                        ${value.isClue ? "text-2xl font-bold text-gray-600" : "text-3xl font-medium text-gray-800"}
                        ${!isCorrect ? "text-red-500 enabled:hover:text-red-500" : ""}
                    `}
                    size={value.isClue ? "md" : "sm"}
                    data-hover={false}
                >
                    {value.value ?? "0"}
                </ButtonText>
            </Button>
        </ButtonGroup>
    )
}

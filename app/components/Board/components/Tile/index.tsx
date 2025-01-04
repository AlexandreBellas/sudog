import { ITile } from "@/@types/tile"
import { Button, ButtonGroup, ButtonText } from "@/components/ui/button"
import { blockSize } from "@/constants/game"
import { useGame, useGameDispatch } from "@/contexts/GameProvider"
import { useCallback, useMemo } from "react"

interface ITileProps {
    value: ITile
    i: number
    j: number
}

export default function Tile({
    value,
    i,
    j
}: Readonly<ITileProps>) {
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
        () => !!selectedTilePosition && (selectedTilePosition.i === i || selectedTilePosition.j === j || (
            iBlock === (Math.floor(selectedTilePosition.i / blockSize)) && jBlock === (Math.floor(selectedTilePosition.j / blockSize))
        )),
        [selectedTilePosition, i, j, iBlock, jBlock]
    )
    const bgClassName = useMemo(() => {
        if (isSelected) return "bg-green-300"
        if (isOnRowOrColumnOrGridOfSelected) return "bg-green-100"

        return null
    }, [isSelected, isOnRowOrColumnOrGridOfSelected])
    // #endregion

    // #region Callbacks
    const handleSelectTile = useCallback(() => {
        gameDispatch({ type: "select-tile", i, j })
    }, [gameDispatch, i, j])
    // #endregion

    return (
        <ButtonGroup className={`${bgClassName ?? "bg-white"} aspect-square justify-center items-center box-content`}>
            <Button onPress={handleSelectTile}>
                <ButtonText className={`
                    ${value.value === null ? "invisible" : ""}
                `}>
                    {value.value ?? "0"}
                </ButtonText>
            </Button>
        </ButtonGroup>
    )
}
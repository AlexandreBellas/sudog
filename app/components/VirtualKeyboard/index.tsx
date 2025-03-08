import { useGame, useGameDispatch } from "@/contexts/GameProvider"
import { useCallback } from "react"
import { Button, ButtonText } from "../ui/button"

export default function VirtualKeyboard() {
    // #region Contexts
    const { board } = useGame()
    const gameDispatch = useGameDispatch()
    // #endregion

    // #region Callbacks
    const isOptionDisabled = useCallback(
        (option: number) => {
            return (
                board.reduce(
                    (acc, row) => acc + row.reduce((rowAcc, tile) => rowAcc + (tile.value === option ? 1 : 0), 0),
                    0
                ) >= 9
            )
        },
        [board]
    )

    const handlePlaceNumberForSelectedTile = useCallback(
        (value: number) => {
            gameDispatch({ type: "set-value-for-selected-tile", value })
        },
        [gameDispatch]
    )
    // #endregion

    return (
        <div className="flex-none flex gap-1 justify-center overflow-hidden pb-1">
            {Array.from({ length: 9 }, (_, index) => index + 1).map((number) => (
                <Button
                    key={number}
                    onPress={() => handlePlaceNumberForSelectedTile(number)}
                    className="bg-blue-100 text-blue-500 px-2 sm:aspect-square border-[1px]
                        border-blue-500
                        disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-200
                        data-[hover=true]:bg-blue-200 data-[hover=true]:text-blue-600
                        data-[active=true]:bg-blue-300 data-[active=true]:text-blue-700"
                    disabled={isOptionDisabled(number)}
                >
                    <ButtonText className="text-lg font-normal sm:text-xl">{number}</ButtonText>
                </Button>
            ))}
        </div>
    )
}

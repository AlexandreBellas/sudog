import { useGame, useGameDispatch } from "@/contexts/GameProvider"
import { mapNumberToBackground } from "@/utils/dogs/map-number-to-background"
import { useCallback } from "react"
import { Button, ButtonText } from "../ui/button"
import { Image } from "../ui/image"

export default function VirtualKeyboard() {
    // #region Contexts
    const {
        board,
        config: { featureFlags }
    } = useGame()
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
        <div className="flex-none flex gap-1 justify-center overflow-hidden pb-1 w-full flex-nowrap">
            {Array.from({ length: 9 }, (_, index) => index + 1).map((number) => (
                <Button
                    key={number}
                    onPress={() => handlePlaceNumberForSelectedTile(number)}
                    className="flex-initial border-[1px] min-h-0 min-w-0 w-auto aspect-square px-0
                        grow shrink basis-0 relative
                        bg-blue-100 text-blue-500 border-blue-500
                        disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-200
                        data-[hover=true]:bg-blue-200 data-[hover=true]:text-blue-600
                        data-[active=true]:bg-blue-300 data-[active=true]:text-blue-700"
                    disabled={isOptionDisabled(number)}
                >
                    {featureFlags.onlyDogs && (
                        <Image
                            source={mapNumberToBackground(number)}
                            className={`absolute inset-0 object-contain max-h-full
                                ${isOptionDisabled(number) ? "opacity-40" : ""}
                            `}
                            alt={`${number} dog`}
                        />
                    )}
                    <ButtonText
                        className={`text-lg font-normal sm:text-xl
                        ${featureFlags.onlyDogs ? "invisible" : ""}
                    `}
                    >
                        {number}
                    </ButtonText>
                </Button>
            ))}
        </div>
    )
}

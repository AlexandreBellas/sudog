import { useGameDispatch } from "@/contexts/GameProvider"
import { useCallback } from "react"
import { Button } from "../ui/button"

export default function VirtualKeyboard() {
    // #region Contexts
    const gameDispatch = useGameDispatch()
    // #endregion

    // #region Callbacks
    const handlePlaceNumberForSelectedTile = useCallback(
        (value: number) => {
            gameDispatch({ type: "set-value-for-selected-tile", value })
        },
        [gameDispatch]
    )
    // #endregion

    return (
        <div className="flex gap-1 w-full flex-wrap justify-center">
            {Array.from({ length: 9 }, (_, index) => index + 1).map((number) => (
                <Button
                    key={number}
                    onPress={() => handlePlaceNumberForSelectedTile(number)}
                    className="bg-gray-200 hover:bg-gray-300 aspect-square"
                >
                    {number}
                </Button>
            ))}
        </div>
    )
}

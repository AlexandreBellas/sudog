import { blockSize, boardSize } from "@/constants/game";
import { Grid, GridItem } from "../ui/grid";
import Block from "./components/Block";
import { Box } from "../ui/box";
import { useEffect } from "react";
import { useGameDispatch } from "@/contexts/GameProvider";

export default function Board() {
    // #region Contexts
    const gameDispatch = useGameDispatch()
    // #endregion

    // #region Effects
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const key = event.key
            if (key >= "1" && key <= "9") {
                gameDispatch({ type: "set-value-for-selected-tile", value: parseInt(key) })
            }
        }

        window.addEventListener("keydown", handleKeyPress)

        return () => window.removeEventListener("keydown", handleKeyPress)
    }, [])
    // #endregion

    return (
        <Box>
            <Grid className="max-w-max gap-0.5 bg-gray-600 border-2 border-gray-600 aspect-square" _extra={{ className: "grid-cols-3" }}>
                {[...Array(boardSize).keys()].flatMap(i => [...Array(blockSize).keys()].map(j => (
                    <GridItem key={`block-${i}-${j}`} className="aspect-square" _extra={{ className: "col-span-1" }}>
                        <Block iBlock={i} jBlock={j} />
                    </GridItem>
                )))}
            </Grid>
        </Box>
    )
}
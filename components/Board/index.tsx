import { blockSize, boardSize } from "@/constants/game";
import { Grid, GridItem } from "../ui/grid";
import Block from "./components/Block";
import { Box } from "../ui/box";

export default function Board() {
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
import { Grid, GridItem } from "@/components/ui/grid"
import { blockSize } from "@/constants/game"
import { useGame } from "@/contexts/GameProvider"
import { useCallback } from "react"
import Tile from "../Tile"

interface IBlockProps {
    iBlock: number
    jBlock: number
}

export default function Block({ iBlock, jBlock }: Readonly<IBlockProps>) {
    // #region Contexts
    const { board, solvedBoard } = useGame()
    // #endregion

    // #region Callbacks
    const shouldRenderTile = useCallback((idxBoardTile: number, idxBlock: number) => {
        const isTileBeforeAllowed = idxBoardTile < idxBlock * blockSize
        const isTileAfterAllowed = (idxBlock + 1) * blockSize <= idxBoardTile

        return !(isTileBeforeAllowed || isTileAfterAllowed)
    }, [])
    // #endregion

    return (
        <Grid
            className="max-h-max bg-gray-300 gap-0.5"
            _extra={{ className: "grid-cols-3" }}
        >
            {board.map((row, iBoardTile) => {
                if (!shouldRenderTile(iBoardTile, iBlock)) return null

                return row.map((tile, jBoardTile) => {
                    if (!shouldRenderTile(jBoardTile, jBlock)) return null

                    return (
                        <GridItem
                            key={`${iBlock}-${jBlock}-${iBoardTile}-${jBoardTile}`}
                            _extra={{ className: "col-span-1" }}
                        >
                            <Tile
                                correctValue={solvedBoard[iBoardTile][jBoardTile].value!}
                                value={tile}
                                i={iBoardTile}
                                j={jBoardTile}
                            />
                        </GridItem>
                    )
                })
            })}
        </Grid>
    )
}

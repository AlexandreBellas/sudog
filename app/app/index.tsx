import { featureFlags, IFeatureFlag } from "@/@types/game"
import Board from "@/components/Board"
import HeadTitle from "@/components/HeadTitle"
import { Box } from "@/components/ui/box"
import { Spinner } from "@/components/ui/spinner"
import VirtualKeyboard from "@/components/VirtualKeyboard"
import GameProvider, { IInitialBoardProps } from "@/contexts/GameProvider"
import "@/global.css"
import { useBoardService } from "@/hooks/services/useBoardService"
import { parseMatrixToSolvableBoard } from "@/utils/sudoku/parse-matrix-to-solvable-board"
import { OverlayProvider } from "@gluestack-ui/overlay"
import { useEffect, useState } from "react"

export default function Index() {
    // #region Contexts
    const boardGateway = useBoardService()
    // #endregion

    // #region States
    const [initialBoard, setInitialBoard] = useState<IInitialBoardProps>()
    const [initialFeatureFlags, setInitialFeatureFlags] = useState<{ [key in IFeatureFlag]: boolean }>()
    const [isFetchingSavedBoard, setIsFetchingSavedBoard] = useState(true)
    // #endregion

    // #region Effects

    // onRenderFetchSavedBoardAndFeatureFlags
    useEffect(() => {
        const promiseBoard = boardGateway
            .getBoard()
            .then((board) => {
                if (board.data) {
                    setInitialBoard(board.data)
                    return
                }

                return boardGateway.newRandomBoard({ level: "easy" })
            })
            .then((board) => board && setInitialBoard(parseMatrixToSolvableBoard(board.content, board.level)))

        const promiseFeatureFlags = boardGateway.getFeatureFlags().then(
            (featureFlagsResponse) =>
                featureFlagsResponse.data &&
                setInitialFeatureFlags(
                    Object.fromEntries(featureFlags.map((f) => [f, featureFlagsResponse.data?.[f] ?? true])) as {
                        [key in IFeatureFlag]: boolean
                    }
                )
        )

        Promise.allSettled([promiseBoard, promiseFeatureFlags]).finally(() => setIsFetchingSavedBoard(false))
    }, [boardGateway])

    // #endregion

    return (
        <OverlayProvider>
            <Box className="flex flex-row w-full justify-center px-1 sm:px-0 overflow-hidden bg-blue-50 h-screen">
                {isFetchingSavedBoard ? (
                    <Spinner size="small" />
                ) : (
                    <Box className="flex flex-col justify-start items-center gap-2 overflow-auto">
                        <HeadTitle />
                        <GameProvider
                            initialBoard={initialBoard}
                            initialFeatureFlags={initialFeatureFlags}
                        >
                            <Board />
                            <VirtualKeyboard />
                        </GameProvider>
                    </Box>
                )}
            </Box>
        </OverlayProvider>
    )
}

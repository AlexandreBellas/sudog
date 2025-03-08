import { IConfig } from "@/@types/config"
import backgroundImage from "@/assets/images/background.png"
import Board from "@/components/Board"
import HeadTitle from "@/components/HeadTitle"
import { Box } from "@/components/ui/box"
import { Image } from "@/components/ui/image"
import { Spinner } from "@/components/ui/spinner"
import VirtualKeyboard from "@/components/VirtualKeyboard"
import GameProvider, { IInitialBoardProps } from "@/contexts/GameProvider"
import { useService } from "@/contexts/ServiceProvider"
import "@/global.css"
import { parseMatrixToSolvableBoard } from "@/utils/sudoku/parse-matrix-to-solvable-board"
import { useEffect, useState } from "react"

export default function Index() {
    // #region Contexts
    const { boardGateway } = useService()
    // #endregion

    // #region States
    const [initialBoard, setInitialBoard] = useState<IInitialBoardProps>()
    const [initialConfig, setInitialConfig] = useState<IConfig>()
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

        const promiseConfig = boardGateway.getConfig().then((configResponse) => {
            if (configResponse.data) {
                setInitialConfig(configResponse.data)
            }
        })

        Promise.allSettled([promiseBoard, promiseConfig]).finally(() => setIsFetchingSavedBoard(false))
    }, [boardGateway])

    // #endregion

    return (
        <Box className="flex flex-row w-full justify-center px-1 pt-4 sm:px-0 overflow-hidden bg-blue-50 h-screen z-10">
            {isFetchingSavedBoard ? (
                <Spinner size="small" />
            ) : (
                <Box className="flex flex-col justify-start items-center gap-2 overflow-auto">
                    <HeadTitle />
                    <GameProvider
                        initialBoard={initialBoard}
                        initialConfig={initialConfig}
                    >
                        <Board />
                        <VirtualKeyboard />
                    </GameProvider>
                </Box>
            )}
            <Image
                source={backgroundImage}
                alt="background"
                className="absolute top-0 left-0 w-full h-full -z-10 opacity-15"
            />
        </Box>
    )
}

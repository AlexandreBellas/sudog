import Board from "@/components/Board"
import HeadTitle from "@/components/HeadTitle"
import { Box } from "@/components/ui/box"
import { Spinner } from "@/components/ui/spinner"
import VirtualKeyboard from "@/components/VirtualKeyboard"
import GameProvider, { IInitialBoardProps } from "@/contexts/GameProvider"
import "@/global.css"
import { useBoardService } from "@/hooks/services/useBoardService"
import { useEffect, useState } from "react"

export default function Index() {
    // #region Contexts
    const { boardGateway } = useBoardService()
    // #endregion

    // #region States
    const [initialBoard, setInitialBoard] = useState<IInitialBoardProps>()
    const [isFetchingSavedBoard, setIsFetchingSavedBoard] = useState(true)
    // #endregion

    // #region Effects
    useEffect(() => {
        boardGateway
            .getBoard()
            .then((board) => board.data && setInitialBoard(board.data))
            .finally(() => setIsFetchingSavedBoard(false))
    }, [boardGateway])
    // #endregion

    return (
        <Box className="flex flex-row w-full justify-center p-5 overflow-hidden bg-blue-50 h-screen">
            {isFetchingSavedBoard ? (
                <Spinner size="small" />
            ) : (
                <Box className="flex flex-col justify-start items-center gap-2 overflow-auto">
                    <HeadTitle />
                    <GameProvider initialBoard={initialBoard}>
                        <Board />
                        <VirtualKeyboard />
                    </GameProvider>
                </Box>
            )}
        </Box>
    )
}

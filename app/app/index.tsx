import Board from "@/components/Board"
import HeadTitle from "@/components/HeadTitle"
import { Box } from "@/components/ui/box"
import VirtualKeyboard from "@/components/VirtualKeyboard"
import GameProvider from "@/contexts/GameProvider"
import "@/global.css"

export default function Index() {
    return (
        <Box className="flex flex-row w-full justify-center p-5 overflow-hidden bg-blue-50 h-screen">
            <Box className="flex flex-col justify-start items-center gap-2 overflow-auto">
                <HeadTitle />
                <GameProvider>
                    <Board />
                    <VirtualKeyboard />
                </GameProvider>
            </Box>
        </Box>
    )
}

import Board from "@/components/Board"
import { Box } from "@/components/ui/box"
import VirtualKeyboard from "@/components/VirtualKeyboard"
import GameProvider from "@/contexts/GameProvider"
import "@/global.css"

export default function Index() {
    return (
        <Box className="flex flex-row w-full justify-center p-5 overflow-auto">
            <Box className="flex flex-col justify-start items-center">
                <GameProvider>
                    <Board />
                    <VirtualKeyboard />
                </GameProvider>
            </Box>
        </Box>
    )
}

import Board from "@/components/Board";
import { Box } from "@/components/ui/box";
import GameProvider from "@/contexts/GameProvider";
import "@/global.css";

export default function Index() {
  return (
    <GameProvider>
      <Box className="flex flex-row flex-1 p-5 justify-center">
        <Board />
      </Box>
    </GameProvider>
  )
}

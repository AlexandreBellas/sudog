import { Box } from "../ui/box"
import { Text } from "../ui/text"

export default function HeadTitle() {
    return (
        <Box className="flex flex-col items-center rounded-md py-1 px-4 bg-white">
            <Text className="text-2xl font-bold text-gray-700">🐕 Sudog</Text>
            <Text className="text-sm italic">A sudoku game dog-themed</Text>
        </Box>
    )
}

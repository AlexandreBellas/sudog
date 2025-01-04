import { blockSize } from "@/constants/game";

export function isTileValueValid(value: number): boolean {
    return 1 <= value && value <= (blockSize * blockSize)
}
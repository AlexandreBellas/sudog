import { blockSize } from "@/constants/game"

export function isTileValueValid(value: number): boolean {
    return !isNaN(value) && 1 <= value && value <= blockSize * blockSize
}

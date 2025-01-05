import { isTile } from "@/@types/tile"

export function doesArrayHasDuplicates(arr: unknown[]): boolean {
    if (!arr.every(isTile)) return arr.filter((e, i, a) => a.indexOf(e) !== i).length > 0

    return arr.filter((e, i, a) => a.findIndex((t) => t.value === e.value) !== i).length > 0
}

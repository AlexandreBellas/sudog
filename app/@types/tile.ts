export interface ITile {
    value: number | null
    notes: number[]
}

export function isTile(tile: unknown): tile is ITile {
    return (
        typeof tile === "object" &&
        tile !== null &&
        "value" in tile &&
        "notes" in tile &&
        (typeof tile.value === "number" || tile.value === null) &&
        Array.isArray(tile.notes)
    )
}

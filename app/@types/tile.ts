export interface ITile<TValue extends number | null = number | null> {
    value: TValue
}

export interface IPlayableTile<TValue extends number | null = number | null> extends ITile<TValue> {
    notes: number[]
    /**
     * Marks as a initial tile.
     */
    isClue: boolean
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

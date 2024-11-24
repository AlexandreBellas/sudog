export function transposeArray<T>(arr: T[][]): T[][] {
    return arr[0].map((_, colIndex) => arr.map(row => row[colIndex]));
}
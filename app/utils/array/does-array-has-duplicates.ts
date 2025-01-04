export function doesArrayHasDuplicates(arr: unknown[]): boolean {
    return arr.filter((e, i, a) => a.indexOf(e) !== i).length > 0
}
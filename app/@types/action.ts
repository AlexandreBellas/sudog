export type IAction = {
    i: number
    j: number
} & (
    | {
          type: "value"
          value: number
          previousValue: number | null
      }
    | {
          type: "note"
          value: number[]
          previousValue: number[]
      }
)

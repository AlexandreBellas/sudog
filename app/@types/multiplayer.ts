import { IBoard } from "./board"

export interface IMultiplayer {
    playerId: string
    remoteBoard: IBoard["current"]
}

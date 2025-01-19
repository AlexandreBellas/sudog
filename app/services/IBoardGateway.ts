import { IAction } from "@/@types/action"
import { IPlayableTile, ITile } from "@/@types/tile"

export interface ISaveableBoard {
    board: IPlayableTile[][]
    solvedBoard: ITile<number>[][]
    history: IAction[]
}

export type IBoardGatewaySaveBoardRequest = ISaveableBoard

export interface IBoardGatewaySaveBoardResponse {
    isSuccessful: boolean
}

export interface IBoardGatewayGetBoardResponse {
    data: ISaveableBoard | null
}

export interface IBoardGatewayClearBoardResponse {
    isSuccessful: boolean
}

export default interface IBoardGateway {
    saveBoard(request: IBoardGatewaySaveBoardRequest): Promise<IBoardGatewaySaveBoardResponse>
    getBoard(): Promise<IBoardGatewayGetBoardResponse>
    clearBoard(): Promise<IBoardGatewayClearBoardResponse>
}

import { IPlayableTile, ITile } from "@/@types/tile"

export interface IBoardGatewaySaveBoardRequest {
    board: IPlayableTile[][]
    solvedBoard: ITile<number>[][]
}

export interface IBoardGatewaySaveBoardResponse {
    isSuccessful: boolean
}

export interface IBoardGatewayGetBoardResponse {
    data: {
        board: IPlayableTile[][]
        solvedBoard: ITile<number>[][]
    } | null
}

export interface IBoardGatewayClearBoardResponse {
    isSuccessful: boolean
}

export default interface IBoardGateway {
    saveBoard(request: IBoardGatewaySaveBoardRequest): Promise<IBoardGatewaySaveBoardResponse>
    getBoard(): Promise<IBoardGatewayGetBoardResponse>
    clearBoard(): Promise<IBoardGatewayClearBoardResponse>
}

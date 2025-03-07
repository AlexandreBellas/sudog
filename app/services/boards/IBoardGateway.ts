import { IAction } from "@/@types/action"
import { IConfig } from "@/@types/config"
import { IDifficultyLevel } from "@/@types/game"
import { IPlayableTile, ITile } from "@/@types/tile"

export interface ISaveableBoard {
    board: IPlayableTile[][]
    solvedBoard: ITile<number>[][]
    history: IAction[]
    level: IDifficultyLevel
    errorsCount: number
}
export type IBoardGatewaySaveConfigRequest = IConfig

export interface IBoardGatewaySaveConfigResponse {
    isSuccessful: boolean
}

export interface IBoardGatewayGetConfigResponse {
    data: IConfig | null
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

export interface IBoardGatewayNewRandomBoardRequest {
    level: IDifficultyLevel
}

export interface IBoardGatewayNewRandomBoardResponse {
    id: number
    board_id: string
    level: IDifficultyLevel
    size: number
    content: (number | null)[][]
}

export interface IBoardGatewayGenerateBoardRequest {
    adminId: string
    level?: IDifficultyLevel
    number?: number
}

export interface IBoardGatewayGenerateBoardResponse {
    count: number
    data: {
        board_id: string
        level: IDifficultyLevel
        size: number
        content: (number | null)[][]
    }[]
}

export default interface IBoardGateway {
    saveConfig(request: IBoardGatewaySaveConfigRequest): Promise<IBoardGatewaySaveConfigResponse>
    getConfig(): Promise<IBoardGatewayGetConfigResponse>
    saveBoard(request: IBoardGatewaySaveBoardRequest): Promise<IBoardGatewaySaveBoardResponse>
    getBoard(): Promise<IBoardGatewayGetBoardResponse>
    clearBoard(): Promise<IBoardGatewayClearBoardResponse>
    newRandomBoard(request: IBoardGatewayNewRandomBoardRequest): Promise<IBoardGatewayNewRandomBoardResponse>
    generateBoard(request: IBoardGatewayGenerateBoardRequest): Promise<IBoardGatewayGenerateBoardResponse>
}

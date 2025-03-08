import { IBoard } from "@/@types/board"
import { IDifficultyLevel } from "@/@types/game"

export interface IMultiplayerGatewayStartGameWithPlayerRequest {
    level: IDifficultyLevel
    playerId: string
}

export interface IMultiplayerGatewayStartGameWithPlayerResponse {
    isSuccessful: boolean
}

export interface IMultiplayerGatewayLeaveGameRequest {
    playerId: string
}

export interface IMultiplayerGatewayLeaveGameResponse {
    playerId: string
}

export interface IMultiplayerGatewaySendBoardToPeerRequest {
    playerId: string
    currentBoard: IBoard["current"]
}

export interface IMultiplayerGatewaySendBoardToPeerResponse {
    isSuccessful: boolean
}

export interface IMultiplayerGatewayReceiveBoardFromPeerRequest {
    playerId: string
}

export interface IMultiplayerGatewayReceiveBoardFromPeerResponse {
    isSuccessful: boolean
}

export default interface IMultiplayerGateway {
    startGameWithPlayer(
        request: IMultiplayerGatewayStartGameWithPlayerRequest
    ): Promise<IMultiplayerGatewayStartGameWithPlayerResponse>

    leaveGame(request: IMultiplayerGatewayLeaveGameRequest): Promise<IMultiplayerGatewayLeaveGameResponse>

    sendBoardToPeer(
        request: IMultiplayerGatewaySendBoardToPeerRequest
    ): Promise<IMultiplayerGatewaySendBoardToPeerResponse>

    receiveBoardFromPeer(
        request: IMultiplayerGatewayReceiveBoardFromPeerRequest
    ): Promise<IMultiplayerGatewayReceiveBoardFromPeerResponse>
}

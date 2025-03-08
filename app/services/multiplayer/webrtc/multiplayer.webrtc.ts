import IMultiplayerGateway, {
    IMultiplayerGatewayLeaveGameRequest,
    IMultiplayerGatewayLeaveGameResponse,
    IMultiplayerGatewayReceiveBoardFromPeerRequest,
    IMultiplayerGatewayReceiveBoardFromPeerResponse,
    IMultiplayerGatewaySendBoardToPeerRequest,
    IMultiplayerGatewaySendBoardToPeerResponse,
    IMultiplayerGatewayStartGameWithPlayerRequest,
    IMultiplayerGatewayStartGameWithPlayerResponse
} from "../IMultiplayerGateway"

export default class MultiplayerWebRtcGateway implements IMultiplayerGateway {
    constructor() {}

    startGameWithPlayer(
        request: IMultiplayerGatewayStartGameWithPlayerRequest
    ): Promise<IMultiplayerGatewayStartGameWithPlayerResponse> {
        throw new Error("Method not implemented.")
    }

    leaveGame(request: IMultiplayerGatewayLeaveGameRequest): Promise<IMultiplayerGatewayLeaveGameResponse> {
        throw new Error("Method not implemented.")
    }

    sendBoardToPeer(
        request: IMultiplayerGatewaySendBoardToPeerRequest
    ): Promise<IMultiplayerGatewaySendBoardToPeerResponse> {
        throw new Error("Method not implemented.")
    }

    receiveBoardFromPeer(
        request: IMultiplayerGatewayReceiveBoardFromPeerRequest
    ): Promise<IMultiplayerGatewayReceiveBoardFromPeerResponse> {
        throw new Error("Method not implemented.")
    }
}

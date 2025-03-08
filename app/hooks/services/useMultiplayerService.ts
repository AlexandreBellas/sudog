import IMultiplayerGateway from "@/services/multiplayer/IMultiplayerGateway"
import MultiplayerWebRtcGateway from "@/services/multiplayer/webrtc/multiplayer.webrtc"
import { useMemo } from "react"

export function useMultiplayerService(): IMultiplayerGateway {
    const multiplayerGateway = useMemo(() => new MultiplayerWebRtcGateway(), [])

    return multiplayerGateway
}

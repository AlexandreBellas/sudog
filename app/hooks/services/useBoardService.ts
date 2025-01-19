import BoardLocalGateway from "@/services/local/board.local"
import { useMemo } from "react"

export function useBoardService() {
    const boardGateway = useMemo(() => new BoardLocalGateway(), [])

    return {
        boardGateway
    }
}

import { BoardApiService } from "@/services/boards/api/board.api"
import IBoardGateway from "@/services/boards/IBoardGateway"
import BoardLocalGateway from "@/services/boards/local/board.local"
import { useMemo } from "react"

export function useBoardService(): IBoardGateway {
    const boardGateway = useMemo(() => {
        const localInstance = new BoardLocalGateway()
        const apiInstance = new BoardApiService(process.env.EXPO_PUBLIC_API_URL ?? "")

        return {
            getConfig: localInstance.getConfig.bind(localInstance),
            saveConfig: localInstance.saveConfig.bind(localInstance),
            getBoard: localInstance.getBoard.bind(localInstance),
            saveBoard: localInstance.saveBoard.bind(localInstance),
            clearBoard: localInstance.clearBoard.bind(localInstance),
            newRandomBoard: apiInstance.newRandomBoard.bind(apiInstance),
            generateBoard: apiInstance.generateBoard.bind(apiInstance)
        }
    }, [])

    return boardGateway
}

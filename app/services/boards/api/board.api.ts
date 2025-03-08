import IBoardGateway, {
    IBoardGatewayClearBoardResponse,
    IBoardGatewayGenerateBoardRequest,
    IBoardGatewayGenerateBoardResponse,
    IBoardGatewayGetBoardResponse,
    IBoardGatewayGetFeatureFlagsResponse,
    IBoardGatewayNewRandomBoardRequest,
    IBoardGatewayNewRandomBoardResponse,
    IBoardGatewaySaveBoardResponse,
    IBoardGatewaySaveFeatureFlagsResponse
} from "../IBoardGateway"

export class BoardApiService implements IBoardGateway {
    constructor(private readonly apiUrl: string) {}

    getFeatureFlags(): Promise<IBoardGatewayGetFeatureFlagsResponse> {
        throw new Error("Method not implemented.")
    }

    saveFeatureFlags(): Promise<IBoardGatewaySaveFeatureFlagsResponse> {
        throw new Error("Method not implemented.")
    }

    saveBoard(): Promise<IBoardGatewaySaveBoardResponse> {
        throw new Error("Method not implemented.")
    }

    getBoard(): Promise<IBoardGatewayGetBoardResponse> {
        throw new Error("Method not implemented.")
    }

    clearBoard(): Promise<IBoardGatewayClearBoardResponse> {
        throw new Error("Method not implemented.")
    }

    async newRandomBoard(request: IBoardGatewayNewRandomBoardRequest): Promise<IBoardGatewayNewRandomBoardResponse> {
        const { level } = request

        const response = await fetch(`${this.apiUrl}/boards/random?level=${level}`)

        if (!response.ok) {
            throw new Error("Network response was not ok")
        }

        return await response.json()
    }

    async generateBoard(request: IBoardGatewayGenerateBoardRequest): Promise<IBoardGatewayGenerateBoardResponse> {
        const { adminId, level, number } = request

        const body: Record<string, string | number> = {}

        if (level) body.level = level
        if (number) body.number = number

        const response = await fetch(`${this.apiUrl}/boards/generate`, {
            headers: { "X-Admin-Id": adminId },
            method: "POST",
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            throw new Error("Network response was not ok")
        }

        return await response.json()
    }
}

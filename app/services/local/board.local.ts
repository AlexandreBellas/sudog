import AsyncStorage from "@react-native-async-storage/async-storage"
import IBoardGateway, {
    IBoardGatewayClearBoardResponse,
    IBoardGatewayGenerateBoardResponse,
    IBoardGatewayGetBoardResponse,
    IBoardGatewayNewRandomBoardResponse,
    IBoardGatewaySaveBoardRequest,
    IBoardGatewaySaveBoardResponse
} from "../IBoardGateway"

export default class BoardLocalGateway implements IBoardGateway {
    static readonly BOARD_KEY = "saved_board"

    async saveBoard(request: IBoardGatewaySaveBoardRequest): Promise<IBoardGatewaySaveBoardResponse> {
        const serializedBoard = JSON.stringify(request)

        try {
            await AsyncStorage.setItem(BoardLocalGateway.BOARD_KEY, serializedBoard)
            return { isSuccessful: true }
        } catch (error) {
            console.error(error)
            return { isSuccessful: false }
        }
    }

    async getBoard(): Promise<IBoardGatewayGetBoardResponse> {
        try {
            const serializedBoard = await AsyncStorage.getItem(BoardLocalGateway.BOARD_KEY)
            if (!serializedBoard) return { data: null }

            return { data: JSON.parse(serializedBoard) }
        } catch (error) {
            console.error(error)
            return { data: null }
        }
    }

    async clearBoard(): Promise<IBoardGatewayClearBoardResponse> {
        try {
            await AsyncStorage.removeItem(BoardLocalGateway.BOARD_KEY)
            return { isSuccessful: true }
        } catch (error) {
            console.error(error)
            return { isSuccessful: false }
        }
    }

    async newRandomBoard(): Promise<IBoardGatewayNewRandomBoardResponse> {
        throw new Error("Not implemented")
    }

    async generateBoard(): Promise<IBoardGatewayGenerateBoardResponse> {
        throw new Error("Not implemented")
    }
}

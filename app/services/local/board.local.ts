import AsyncStorage from "@react-native-async-storage/async-storage"
import IBoardGateway, {
    IBoardGatewayClearBoardResponse,
    IBoardGatewayGetBoardResponse,
    IBoardGatewaySaveBoardRequest,
    IBoardGatewaySaveBoardResponse
} from "../IBoardGateway"

export default class BoardLocalGateway implements IBoardGateway {
    static readonly BOARD_KEY = "saved_board"

    async saveBoard(request: IBoardGatewaySaveBoardRequest): Promise<IBoardGatewaySaveBoardResponse> {
        const { board, solvedBoard } = request
        const serializedBoard = JSON.stringify({ board, solvedBoard })

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

            const { board, solvedBoard } = JSON.parse(serializedBoard)
            return { data: { board, solvedBoard } }
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
}

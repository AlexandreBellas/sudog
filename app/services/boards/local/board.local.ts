import AsyncStorage from "@react-native-async-storage/async-storage"
import IBoardGateway, {
    IBoardGatewayClearBoardResponse,
    IBoardGatewayGenerateBoardResponse,
    IBoardGatewayGetBoardResponse,
    IBoardGatewayGetFeatureFlagsResponse,
    IBoardGatewayNewRandomBoardResponse,
    IBoardGatewaySaveBoardRequest,
    IBoardGatewaySaveBoardResponse,
    IBoardGatewaySaveFeatureFlagsRequest,
    IBoardGatewaySaveFeatureFlagsResponse
} from "../IBoardGateway"

export default class BoardLocalGateway implements IBoardGateway {
    static readonly BOARD_KEY = "saved_board"
    static readonly FEATURE_FLAGS_KEY = "saved_feature_flags"

    async getFeatureFlags(): Promise<IBoardGatewayGetFeatureFlagsResponse> {
        try {
            const serializedFeatureFlags = await AsyncStorage.getItem(BoardLocalGateway.FEATURE_FLAGS_KEY)
            if (!serializedFeatureFlags) return { data: null }

            return { data: JSON.parse(serializedFeatureFlags) }
        } catch (error) {
            console.error(error)
            return { data: null }
        }
    }

    async saveFeatureFlags(
        request: IBoardGatewaySaveFeatureFlagsRequest
    ): Promise<IBoardGatewaySaveFeatureFlagsResponse> {
        try {
            const serializedFeatureFlags = JSON.stringify(request)
            await AsyncStorage.setItem(BoardLocalGateway.FEATURE_FLAGS_KEY, serializedFeatureFlags)
            return { isSuccessful: true }
        } catch (error) {
            console.error(error)
            return { isSuccessful: false }
        }
    }

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

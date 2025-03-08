import { useBoardService } from "@/hooks/services/useBoardService"
import { useMultiplayerService } from "@/hooks/services/useMultiplayerService"
import IBoardGateway from "@/services/boards/IBoardGateway"
import IMultiplayerGateway from "@/services/multiplayer/IMultiplayerGateway"
import { createContext, useContext, useReducer } from "react"

// #region Type definitions
interface ServiceProviderProps {
    children: React.ReactNode
}

interface ServiceContextState {
    boardGateway: IBoardGateway
    multiplayerGateway: IMultiplayerGateway
}

type ServiceContextAction = {
    type: ""
}
// #endregion

// #region Context definitions
const ServiceContext = createContext({} as ServiceContextState)
const ServiceContextDispatch = createContext({} as React.Dispatch<ServiceContextAction>)
// #endregion

// #region Hook definitions
export function useService() {
    return useContext(ServiceContext)
}
export function useServiceDispatch() {
    return useContext(ServiceContextDispatch)
}
// #endregion

// #region Provider definition
export default function ServiceProvider({ children }: Readonly<ServiceProviderProps>) {
    // #region Services
    const boardGateway = useBoardService()
    const multiplayerGateway = useMultiplayerService()
    // #endregion

    // #region Provider state
    const initialState: ServiceContextState = {
        boardGateway,
        multiplayerGateway
    }

    const [state, dispatch] = useReducer(ServiceReducer, initialState)
    // #endregion

    return (
        <ServiceContext.Provider value={state}>
            <ServiceContextDispatch.Provider value={dispatch}>{children}</ServiceContextDispatch.Provider>
        </ServiceContext.Provider>
    )
}
// #endregion

// #region Reducer definition
function ServiceReducer(state: ServiceContextState, action: ServiceContextAction): ServiceContextState {
    switch (action.type) {
        default: {
            return state
        }
    }
}
// #endregion

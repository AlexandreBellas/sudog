import { Box } from "@/components/ui/box"
import { Button, ButtonText } from "@/components/ui/button"
import { CloseIcon, Icon } from "@/components/ui/icon"
import { Input, InputField } from "@/components/ui/input"
import {
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@/components/ui/modal"
import { Text } from "@/components/ui/text"
import { useGame } from "@/contexts/GameProvider"
import { useService } from "@/contexts/ServiceProvider"
import { useToast } from "@/hooks/useToast"
import { useCallback, useRef } from "react"
import { TextInputProps } from "react-native"
import CopyIdButton from "./components/CopyIdButton"

interface IMultiplayerConnectionModalProps {
    showModal: boolean
    setShowModal: (showModal: boolean) => void
}

export default function MultiplayerConnectionModal({
    showModal,
    setShowModal
}: Readonly<IMultiplayerConnectionModalProps>) {
    // #region Contexts
    const {
        config: { playerId }
    } = useGame()
    const { multiplayerGateway } = useService()
    // #endregion

    // #region Toast
    const { handleToast } = useToast()
    // #endregion

    // #region Refs
    const playerIdInputRef = useRef<TextInputProps>(null)
    // #endregion

    // #region Callbacks

    const handleConnect = useCallback(() => {
        const playerId = playerIdInputRef.current?.value
        if (!playerId) return

        multiplayerGateway
            .startGameWithPlayer({
                level: "easy",
                playerId
            })
            .then(() => {
                //
            })
            .catch(() => {
                handleToast({
                    title: "Error",
                    description: "Failed to connect to player"
                })
            })
    }, [multiplayerGateway, handleToast])

    // #endregion

    return (
        <Modal
            isOpen={showModal}
            onClose={() => {
                setShowModal(false)
            }}
            size="md"
        >
            <ModalBackdrop />
            <ModalContent className="bg-white border-0">
                <ModalHeader>
                    <Text
                        size="lg"
                        bold
                        className="text-typography-950"
                    >
                        Connect to player
                    </Text>
                    <ModalCloseButton>
                        <Icon
                            as={CloseIcon}
                            size="md"
                            className="text-black"
                        />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <Box className="flex flex-col gap-1">
                        <Input>
                            <InputField
                                placeholder="Insert player ID"
                                className="placeholder:text-gray-400"
                                ref={playerIdInputRef}
                            />
                        </Input>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <CopyIdButton playerId={playerId} />
                    <Button
                        variant="outline"
                        size="sm"
                        onPress={() => setShowModal(false)}
                    >
                        <ButtonText>Close</ButtonText>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onPress={handleConnect}
                        action="positive"
                        className="bg-[#267338] border-[#267338] text-white
                            data-[hover=true]:bg-[#108345] data-[hover=true]:border-[#108345]
                            data-[active=true]:bg-[#2EA043] data-[active=true]:border-[#2EA043]"
                    >
                        <ButtonText>Connect</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

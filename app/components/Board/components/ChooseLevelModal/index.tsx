import { difficultyLevels, IDifficultyLevel } from "@/@types/game"
import { Button, ButtonGroup, ButtonText } from "@/components/ui/button"
import { CloseIcon, Icon } from "@/components/ui/icon"
import { Image } from "@/components/ui/image"
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
import { useStartNewGame } from "@/hooks/useStartNewGame"
import { capitalize } from "@/utils/string/capitalize"
import { useCallback, useState } from "react"
import { mapLevelToBackgroundImage } from "./utils/options-background"

interface IChooseLevelModalProps {
    showModal: boolean
    setShowModal: (showModal: boolean) => void
}

export default function ChooseLevelModal({ showModal, setShowModal }: Readonly<IChooseLevelModalProps>) {
    // #region Game
    const { handleStartNewGame } = useStartNewGame()
    // #endregion

    // #region States
    const [isChangingLevel, setIsChangingLevel] = useState(false)
    // #endregion

    // #region Callbacks
    const handleChooseLevel = useCallback(
        (level: IDifficultyLevel) => {
            setIsChangingLevel(true)
            handleStartNewGame(level)
                .then(() => setShowModal(false))
                .finally(() => setIsChangingLevel(false))
        },
        [handleStartNewGame, setShowModal]
    )
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
            <ModalContent
                className={`bg-white border-0
                    ${isChangingLevel ? "opacity-90 pointer-events-none" : ""}
                `}
            >
                <ModalHeader>
                    <Text
                        size="lg"
                        bold
                    >
                        Choose your level:
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
                    <ButtonGroup className="grid grid-cols-2 gap-2">
                        {difficultyLevels.map((level) => (
                            <Button
                                className="aspect-square w-full h-full relative"
                                variant="outline"
                                size="sm"
                                onPress={() => handleChooseLevel(level)}
                                key={level}
                            >
                                <Image
                                    source={mapLevelToBackgroundImage(level)}
                                    className="absolute inset-0 w-full h-full opacity-20"
                                    alt={`${level} level background`}
                                />
                                <ButtonText className="text-3xl text-gray-700">{capitalize(level)}</ButtonText>
                            </Button>
                        ))}
                    </ButtonGroup>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="outline"
                        size="sm"
                        onPress={() => setShowModal(false)}
                    >
                        <ButtonText>Cancel</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

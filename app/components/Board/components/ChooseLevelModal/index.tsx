import { difficultyLevels, IDifficultyLevel } from "@/@types/game"
import { Button, ButtonGroup, ButtonText } from "@/components/ui/button"
import { Image } from "@/components/ui/image"
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@/components/ui/modal"
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
                className={`bg-gray-300 
                    ${isChangingLevel ? "opacity-90 pointer-events-none" : ""}
                `}
            >
                <ModalHeader>
                    <Text>Choose your level:</Text>
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

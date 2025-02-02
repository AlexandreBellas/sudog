import { difficultyLevels, IDifficultyLevel } from "@/@types/game"
import { Button, ButtonGroup, ButtonText } from "@/components/ui/button"
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@/components/ui/modal"
import { Text } from "@/components/ui/text"
import { useStartNewGame } from "@/hooks/useStartNewGame"
import { capitalize } from "@/utils/string/capitalize"
import { useCallback, useState } from "react"

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
                className={`bg-gray-200 
                    ${isChangingLevel ? "opacity-90 pointer-events-none" : ""}
                `}
            >
                <ModalHeader>
                    <Text>Choose another level:</Text>
                </ModalHeader>
                <ModalBody>
                    <ButtonGroup>
                        {difficultyLevels.map((level) => (
                            <Button
                                variant="outline"
                                size="sm"
                                onPress={() => handleChooseLevel(level)}
                                key={level}
                            >
                                <ButtonText>{capitalize(level)}</ButtonText>
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

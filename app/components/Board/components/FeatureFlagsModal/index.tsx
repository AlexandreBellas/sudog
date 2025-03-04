import { featureFlagsLabels, IFeatureFlag } from "@/@types/game"
import { Box } from "@/components/ui/box"
import { Button, ButtonText } from "@/components/ui/button"
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@/components/ui/modal"
import { Switch } from "@/components/ui/switch"
import { Text } from "@/components/ui/text"
import { useGame, useGameDispatch } from "@/contexts/GameProvider"
import { useCallback } from "react"

interface IFeatureFlagsModalProps {
    showModal: boolean
    setShowModal: (showModal: boolean) => void
}

export default function FeatureFlagsModal({ showModal, setShowModal }: Readonly<IFeatureFlagsModalProps>) {
    // #region Contexts
    const { featureFlags } = useGame()
    const gameDispatch = useGameDispatch()
    // #endregion

    // #region Callbacks
    const handleToggleFeatureFlag = useCallback(
        (featureFlag: IFeatureFlag) => {
            gameDispatch({ type: "set-feature-flag", payload: { featureFlag, value: !featureFlags[featureFlag] } })
        },
        [featureFlags, gameDispatch]
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
            <ModalContent className="bg-gray-300">
                <ModalHeader>
                    <Text>Activate or deactivate game controls</Text>
                </ModalHeader>
                <ModalBody>
                    <Box className="flex flex-col gap-1">
                        {Object.entries(featureFlags).map(([featureFlag, value]) => (
                            <Box
                                key={featureFlag}
                                className="flex flex-row items-center gap-2"
                            >
                                <Switch
                                    size="sm"
                                    value={value}
                                    onToggle={() => handleToggleFeatureFlag(featureFlag as IFeatureFlag)}
                                />
                                <Text>{featureFlagsLabels[featureFlag as IFeatureFlag]}</Text>
                            </Box>
                        ))}
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="outline"
                        size="sm"
                        onPress={() => setShowModal(false)}
                    >
                        <ButtonText>Close</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

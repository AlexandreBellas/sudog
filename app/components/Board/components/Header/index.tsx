import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge"
import { Box } from "@/components/ui/box"
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button"
import { useGame } from "@/contexts/GameProvider"
import { CircleX, EditIcon } from "lucide-react-native"
import { Fragment, useState } from "react"
import ChooseLevelModal from "../ChooseLevelModal"

export default function Header() {
    // #region Contexts
    const { level, errorsCount } = useGame()
    // #endregion

    // #region States
    const [showChooseLevelModal, setShowChooseLevelModal] = useState(false)
    // #endregion

    return (
        <Fragment>
            <Box className="flex flex-row items-end justify-between gap-1 mb-1">
                <Button
                    onPress={() => setShowChooseLevelModal(true)}
                    variant="outline"
                    size="xs"
                >
                    <ButtonIcon as={EditIcon} />
                    <ButtonText>Level: {level}</ButtonText>
                </Button>
                <Badge
                    size="md"
                    action="error"
                    className="bg-red-200/60 items-center"
                >
                    <BadgeIcon
                        className="text-red-800"
                        as={CircleX}
                    />
                    <BadgeText className="ml-1 text-red-800 font-medium">{errorsCount}/3</BadgeText>
                </Badge>
            </Box>
            <ChooseLevelModal
                showModal={showChooseLevelModal}
                setShowModal={setShowChooseLevelModal}
            />
        </Fragment>
    )
}

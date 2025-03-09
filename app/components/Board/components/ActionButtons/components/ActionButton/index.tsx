import { Button, ButtonIcon, ButtonText } from "@/components/ui/button"
import { Fragment } from "react"

interface IActionButtonProps {
    icon: React.ElementType
    text: string
    onPress: () => void
}

export default function ActionButton({ icon, text, onPress }: Readonly<IActionButtonProps>) {
    return (
        <Fragment>
            <Button
                size="lg"
                onPress={onPress}
                className="hidden xs:flex flex-col px-2 bg-white data-[hover=true]:bg-white/80"
            >
                <ButtonIcon
                    as={icon}
                    size="lg"
                />
                <ButtonText size="sm">{text}</ButtonText>
            </Button>
            <Button
                size="md"
                onPress={onPress}
                className="flex xs:hidden flex-row px-2 shrink grow basis-0 min-w-0 min-h-0 w-auto
                    bg-white data-[hover=true]:bg-white/80"
            >
                <ButtonIcon
                    as={icon}
                    size="md"
                />
                <ButtonText
                    size="sm"
                    className="text-center"
                >
                    {text}
                </ButtonText>
            </Button>
        </Fragment>
    )
}

import { Button, ButtonIcon, ButtonText } from "@/components/ui/button"
import * as Clipboard from "expo-clipboard"
import { Check } from "lucide-react-native"
import { memo, useCallback, useRef, useState } from "react"

interface ICopyIdButtonProps {
    playerId: string
}

const CopyIdButton = ({ playerId }: Readonly<ICopyIdButtonProps>) => {
    // #region States
    const [hasCopiedId, setHasCopiedId] = useState(false)
    // #endregion

    // #region Refs
    const timeoutCopyIdRef = useRef<NodeJS.Timeout | null>(null)
    // #endregion

    // #region Callbacks
    const handleCopyId = useCallback(() => {
        Clipboard.setStringAsync(playerId).then(() => {
            setHasCopiedId(true)

            if (timeoutCopyIdRef.current) clearTimeout(timeoutCopyIdRef.current)

            timeoutCopyIdRef.current = setTimeout(() => {
                setHasCopiedId(false)
            }, 2000)
        })
    }, [playerId])
    // #endregion

    return (
        <Button
            variant="outline"
            size="sm"
            onPress={handleCopyId}
        >
            <ButtonText>{hasCopiedId ? "Copied" : "Copy ID"}</ButtonText>
            {hasCopiedId && <ButtonIcon as={Check} />}
        </Button>
    )
}

export default memo(CopyIdButton)

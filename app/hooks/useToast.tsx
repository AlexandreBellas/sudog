import { Toast, ToastDescription, ToastTitle, useToast as useGluestackToast } from "@/components/ui/toast"
import { useCallback, useState } from "react"

type IToastProps = {
    title: string
    description?: string
}

export function useToast() {
    // #region Toast
    const toast = useGluestackToast()
    // #endregion

    // #region States
    const [toastId, setToastId] = useState<number>(0)
    // #endregion

    // #region Callbacks

    const showNewToast = useCallback(
        (props: IToastProps) => {
            const newId = Math.random()
            setToastId(newId)
            toast.show({
                id: newId.toString(),
                placement: "top",
                duration: 3000,
                render: ({ id }) => {
                    const uniqueToastId = "toast-" + id
                    return (
                        <Toast
                            nativeID={uniqueToastId}
                            action="muted"
                            variant="solid"
                        >
                            <ToastTitle>{props.title}</ToastTitle>
                            {props.description && <ToastDescription>{props.description}</ToastDescription>}
                        </Toast>
                    )
                }
            })
        },
        [toast]
    )

    const handleToast = useCallback(
        (props: IToastProps) => {
            if (!toast.isActive(toastId.toString())) {
                showNewToast(props)
            }
        },
        [toast, toastId, showNewToast]
    )

    // #endregion

    return {
        handleToast
    }
}

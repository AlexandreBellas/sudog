import ServiceProvider from "@/contexts/ServiceProvider"
import { OverlayProvider } from "@gluestack-ui/overlay"
import { Slot } from "expo-router"
import Head from "expo-router/head"
import { Fragment } from "react"

export default function RootLayout() {
    return (
        <Fragment>
            <Head>
                <title>Sudog</title>
            </Head>
            <OverlayProvider>
                <ServiceProvider>
                    <Slot />
                </ServiceProvider>
            </OverlayProvider>
        </Fragment>
    )
}

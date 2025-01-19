import { Slot } from "expo-router"
import Head from "expo-router/head"

export default function RootLayout() {
    return (
        <>
            <Head>
                <title>Sudog</title>
            </Head>
            <Slot />
        </>
    )
}

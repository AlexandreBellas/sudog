import { ScrollViewStyleReset } from "expo-router/html"
import type { PropsWithChildren } from "react"

export default function Root({ children }: Readonly<PropsWithChildren>) {
    return (
        <html lang="en">
            <head>
                <title data-rh="true">teste</title>
                <meta charSet="utf-8" />
                <meta
                    httpEquiv="X-UA-Compatible"
                    content="IE=edge"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />

                <meta
                    property="og:site_name"
                    content="Sudog"
                />
                <meta
                    property="og:title"
                    content="🐕 Sudog"
                />
                <meta
                    property="og:description"
                    content="A sudoku game dog-themed."
                />
                <meta
                    name="description"
                    content="A sudoku game dog-themed."
                />
                <meta
                    property="og:image"
                    itemProp="image"
                    // eslint-disable-next-line max-len
                    content="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐕</text></svg>"
                />

                <link
                    rel="manifest"
                    href="/manifest.json"
                />

                <ScrollViewStyleReset />
            </head>
            <body>{children}</body>
        </html>
    )
}

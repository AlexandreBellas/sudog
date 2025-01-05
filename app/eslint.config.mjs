import pluginJs from "@eslint/js"
import pluginReact from "eslint-plugin-react"
import pluginReactHooks from "eslint-plugin-react-hooks"
import globals from "globals"
import tsEslint from "typescript-eslint"

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    pluginJs.configs.recommended,
    ...tsEslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        plugins: { "react-hooks": pluginReactHooks },
        rules: pluginReactHooks.configs.recommended.rules,
        ignores: ["*.test.tsx"]
    },
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        rules: {
            "react/react-in-jsx-scope": "off",
            quotes: ["error", "double"],
            "comma-dangle": ["error", "never"],
            semi: ["error", "never"],
            "no-else-return": "error",
            "max-len": ["warn", 120],
            "react/prop-types": "off",
            "@typescript-eslint/no-empty-function": "off"
        }
    }
]

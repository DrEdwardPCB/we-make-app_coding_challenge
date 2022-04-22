declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DEVELOPER_TOKEN?: string
            NEXT_PUBLIC_APP_URL?: string
        }
    }
}
export { }
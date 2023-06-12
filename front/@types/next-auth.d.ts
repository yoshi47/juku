import "next-auth"
import "next-auth/jwt"
import { UserInfo } from "./types"

declare module "next-auth" {
    interface Session {
        user: UserInfo
        accessToken?: string
        refreshToken?: string
    }
    interface User {
        user: UserInfo
        access?: string
        refresh?: string
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        user: UserInfo
        accessToken?: string
        refreshToken?: string
    }
}
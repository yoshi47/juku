import { UserInfo } from "@type/types";
import jwt from "jsonwebtoken"
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "next-auth",
            credentials: {
                username: {label: "Username", type: "text", placeholder: "jsmith"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                const res = await fetch(`${process.env.BACKEND_URL}/api/token/`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(credentials),
                });

                const data = await res.json();
                // const user = jwt.verify(data.access, process.env.NEXTAUTH_SECRET) as UserInfo;
                const user = jwt.verify(data.access, process.env.NEXTAUTH_SECRET);
                if (res.ok && user) {
                    return {...data, user};
                } else {
                    return null;
                }
            },
            // async authorize(credentials, req) {
            //     // Add logic here to look up the user from the credentials supplied
            //     const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
          
            //     if (user) {
            //       // Any object returned will be saved in `user` property of the JWT
            //       return user
            //     } else {
            //       // If you return null then an error will be displayed advising the user to check their details.
            //       return null
          
            //       // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            //     }
            //   }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({token, user, account}) {
            if (account) {
                token.user = {...user.user}
                token.accessToken = user.access
                token.refreshToken = user.refresh
            }
            return token
        },
        async session({session, token}) {
            if (token) {
                session.user = {...token.user}
                session.accessToken = token.accessToken
                session.refreshToken = token.refreshToken
            }
            return session
        },
        async redirect({url, baseUrl}) {
            return baseUrl
        },
    },
})

export { handler as GET, handler as POST }
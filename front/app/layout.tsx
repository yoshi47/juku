import './globals.css'
import {Inter} from 'next/font/google'
import {Header} from "@/components/Header";
import {Footer} from "@components/Footer";
import {Main} from "@/components/Main";


const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html lang="ja">
        <body className={inter.className}>
        <Header/>
        <Main>
            {children}
        </Main>
        <Footer/>
        </body>
        </html>
    )
}

"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export function LoginBtn() {
    const { data: session } = useSession();
    if (session) {
        return (
            <>
                <span className="text-black text-lg font-bold inline-flex items-center mr-3">{session.user.name}</span>
                <button
                    onClick={() => signOut()}
                    className="inline-flex items-center bg-gray-100 hover:bg-gray-200 py-1 px-3 rounded"
                >
                    Logout
                </button>
            </>
        );
    } else {
        return (
            <button
                onClick={() => signIn()}
                className="inline-flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
            >
                Login
            </button>
        );
    }
}
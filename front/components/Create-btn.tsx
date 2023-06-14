"use client";

export function CreateBtn() {
    const { data: session } = useSession();
    if (session.user.role == "admin") {
        return null;
    }
}
import process from "process";
import {Student, Teacher} from "@type/types";

export function FormatDate(date: string) {
    const formatedDate = new Date(date);
    return `${formatedDate.getMonth() + 1}/${formatedDate.getDate()}`;
}

export async function getStudents() {
    const res = await fetch(`${process.env.BACKEND_URL}/api/students/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "reload",
    })

    if (!res.ok) {
        const message = `An error has occurred: ${res.status}`;
        throw new Error(message);
    }

    const data = await res.json();
    return data as Student[];
}

export async function getTeachers() {
    const res = await fetch(`${process.env.BACKEND_URL}/api/teachers/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "reload",
    })

    if (!res.ok) {
        const message = `An error has occurred: ${res.status}`;
        throw new Error(message);
    }

    const data = await res.json();
    return data as Teacher[];
}
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

export async function getTeachers(url: string = `${process.env.BACKEND_URL}`) {
    const res = await fetch(`${url}/api/teachers/`, {
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
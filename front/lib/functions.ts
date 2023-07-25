import process from "process";
import {Lesson, School, Student, Subject, Teacher} from "@type/types";


export function FormatDate(date: string) {
    const formattedDate = new Date(date);
    return `${formattedDate.getMonth() + 1}/${formattedDate.getDate()}`;
}


export async function getStudents(url: string = `${process.env.BACKEND_URL}`) {
    const res = await fetch(`${url}/api/students/`, {
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


export async function getSubjects(url: string = `${process.env.BACKEND_URL}`) {
    const res = await fetch(`${url}/api/subjects/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (!res.ok) {
        const message = `An error has occurred: ${res.status}`;
        throw new Error(message);
    }

    const data = await res.json();
    return data as Subject[];
}


export async function getSchools(url: string = `${process.env.BACKEND_URL}`) {
    const res = await fetch(`${url}/api/schools/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (!res.ok) {
        const message = `An error has occurred: ${res.status}`;
        throw new Error(message);
    }

    const data = await res.json();
    return data as School[];
}

export const getLessons = async (date: Date) => {
    const date_after: string = new Date(date.getFullYear(), date.getMonth(), 1).toLocaleDateString('sv-SE');
    const date_before: string = new Date(date.getFullYear(), date.getMonth() + 1, 0).toLocaleDateString('sv-SE');

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lessons/?date_after=${date_after}&date_before=${date_before}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-cache",
    })

    if (!res.ok) {
        throw new Error("Failed to fetch lessons")
    }

    const data = await res.json()
    return data as Lesson[];
}

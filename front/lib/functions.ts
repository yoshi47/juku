import process from "process";
import {Student, Subject, Teacher} from "@type/types";


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
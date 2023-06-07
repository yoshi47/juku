import * as process from "process";
import Link from "next/link";
import {Student} from "@type/types";

async function getStudents() {
    const res = await fetch(`${process.env.BACKEND_URL}/api/students`, {
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

export default async function StudentList() {
    const students = await getStudents();
    return (
        <div className="container flex flex-col items-center justify-center w-full mx-auto">
            <div className="w-full px-4 py-5 classNamebg-white border rounded-md shadow sm:px-6 dark:bg-gray-800 mb-8">
                <p className="text-lg font-medium text-gray-900 dark:text-white text-center">
                    生徒一覧
                </p>
            </div>
            <ul className="w-full rounded-md">
                {students.map((student) => (
                    <li key={student.username}
                        className="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50 text-center">
                        <Link href={`/students/${student.username}`}>
                            {student.student.school} {student.student.grade} {student.last_name} {student.first_name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
import {Teacher} from "@type/types";
import Link from "next/link";

async function getTeachers() {
    const res = await fetch(`${process.env.BACKEND_URL}/api/teachers`, {
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

export default async function TeacherList() {
    const teachers = await getTeachers();

    return (
        <div className="container flex flex-col items-center justify-center w-full mx-auto">
            <div className="w-full px-4 py-5 classNamebg-white border rounded-md shadow sm:px-6 dark:bg-gray-800 mb-8">
                <p className="text-lg font-medium text-gray-900 dark:text-white text-center">
                    先生一覧
                </p>
            </div>
            <ul className="w-full rounded-md">
                {teachers.map((teacher) => (
                    <li key={teacher.username}
                        className="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50 text-center">
                        <Link href={`/teachers/${teacher.username}`}>
                            {teacher.last_name} {teacher.first_name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
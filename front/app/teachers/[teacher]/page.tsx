import { FormatDate } from "@components/FormatDate";
import {Lesson, Teacher} from "@type/types";

async function getTeacherInfo(username: string) {
    const res = await fetch(`${process.env.BACKEND_URL}/api/teachers/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (!res.ok) {
        throw new Error("Failed to fetch teacher info")
    }

    const data = await res.json()
    return data as Teacher;
}

async function getTeacherSchedule(username: string) {
    const res = await fetch(`${process.env.BACKEND_URL}/api/lessons/?teacher_username=${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (!res.ok) {
        throw new Error("Failed to fetch teacher schedule")
    }

    const data = await res.json()
    return data as Lesson[];
}

export default async function TeacherPage({params,}: { params: { teacher: string } }) {
    const teacherPromise = getTeacherInfo(params.teacher);
    const schedulePromise = getTeacherSchedule(params.teacher);

    const [teacher, schedule] = await Promise.all([teacherPromise, schedulePromise]);

    return (
        <div className="container flex flex-col items-center justify-center w-full mx-auto">
            <div className="w-full px-4 py-5 classNamebg-white border rounded-md shadow sm:px-6 dark:bg-gray-800 mb-3">
                <h3 className="text-lg font-mediclassNameading-6 text-gray-900 dark:text-white">
                    {teacher.last_name} {teacher.first_name} さんの予定
                </h3>
            </div>
            <ul className="flex flex-col w-full">
                {schedule.map((lesson) => (
                    <li key={teacher.username} className="flex flex-row mb-2 border-gray-400">
                        <div
                            className="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
                            <FormatDate date={lesson.date} />
                            <div
                                className="flex flex-col items-center justify-center h-10 mr-4 text-gray-600 dark:text-gray-200">
                                 {lesson.period}限
                            </div>
                            <div className="flex-1 pl-1 md:mr-16">
                                <div className="font-medium dark:text-white">
                                    {lesson.subject}
                                </div>
                                <div className="dark:text-white">
                                    {lesson.student}
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
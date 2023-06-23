"use client";

import process from "process";
import {useRouter} from "next/navigation";
import {ChangeEvent, useState} from "react";
import {PostLesson} from "@type/types";

export default function AddLesson() {
    const router = useRouter()
    const [lesson_data, setLessonData] = useState<PostLesson>({
        "student": "",
        "teacher": "",
        "subject": "",
        "period": 0,
        "date": ""
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setLessonData({
            ...lesson_data,
            [name]: value,
        });
    }

    async function handleSubmit(event: any) {
        event.preventDefault()

        // const lessonData = {
        //     teacher: event.target.teacher.value,
        //     student: event.target.student.value,
        //     subject: event.target.subject.value,
        //     period: event.target.period.value,
        //     date: event.target.date.value,
        // }

        const JSONlessonData = JSON.stringify(lesson_data)
        console.log(JSONlessonData)

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lessons/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSONlessonData,
        })

        const result = await response.json()
        // alert(result.message)
        router.push("/lessons")
    }

    return (
        <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">授業登録</h2>

            <form onSubmit={handleSubmit}>
                {/*<form>*/}
                <div className="grid grid-cols-1 gap-6 mt-4">
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="teacher">先生</label>
                        <input id="teacher" type="text" name="teacher" value={lesson_data.teacher} onChange={handleChange}
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="student">生徒</label>
                        <input id="student" type="text" name="student" value={lesson_data.student} onChange={handleChange}
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="subject">教科</label>
                        <input id="subject" type="text" name="subject" value={lesson_data.subject} onChange={handleChange}
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="period">時限</label>
                        <input id="period" type="text" name="period" value={lesson_data.period} onChange={handleChange}
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="date">日付</label>
                        <input id="date" type="date" name="date" value={lesson_data.date} onChange={handleChange}
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                    </div>

                </div>

                <div className="flex justify-end mt-6">
                    <button
                        className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">登録
                    </button>
                </div>
            </form>
        </div>
    )
}
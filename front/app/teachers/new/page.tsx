"use client";
import process from "process";
import {useRouter} from "next/navigation";
import {ChangeEvent, FormEvent, useState} from "react";
import {Teacher} from "@type/types";

export default function AddTeacher() {
    const router = useRouter()
    const [teacher_data, setTeacherData] = useState<Teacher>({
        "username": "",
        "password": "te",
        "last_name": "",
        "first_name": "",
        "email": "",
        "text": "",
        "user_type": "teacher"
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setTeacherData({
            ...teacher_data,
            [name]: value,
        });
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const JSONteacherData = JSON.stringify(teacher_data)
        // console.log(JSONteacherData)

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/teachers/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSONteacherData,
        })

        const result = await response.json()
        // alert(result.message)
        router.push("/teachers")
    }

    return (
        <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">新規先生登録</h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-4">
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Username</label>
                        <input id="username" type="text" name="username" value={teacher_data.username}
                               onChange={handleChange}
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                    </div>

                    <div className="flex gap-4 mb-2">
                        <div className=" relative ">
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="last-name">姓</label>
                            <input type="text" id="last-name" value={teacher_data.last_name} onChange={handleChange}
                                   className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                   name="last_name" placeholder="山田"/>
                        </div>

                        <div className=" relative ">
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="first-name">名</label>
                            <input type="text" id="first-name" value={teacher_data.first_name} onChange={handleChange}
                                   className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                   name="first_name" placeholder="太郎"/>
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="email">Email Address</label>
                        <input id="email" type="email" name="email" value={teacher_data.email} onChange={handleChange}
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                    </div>

                    {/*<div>*/}
                    {/*    <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>*/}
                    {/*    <input id="password" type="password"*/}
                    {/*           className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>*/}
                    {/*</div>*/}

                    {/*<div>*/}
                    {/*    <label className="text-gray-700 dark:text-gray-200" htmlFor="passwordConfirmation">Password*/}
                    {/*        Confirmation</label>*/}
                    {/*    <input id="passwordConfirmation" type="password"*/}
                    {/*           className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>*/}
                    {/*</div>*/}

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
"use client";

import process from "process";
import { useRouter } from "next/navigation";


export default function AddStudent() {
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const studentData = {
            username: event.target.username.value,
            password: "st",
            last_name: event.target.last_name.value,
            first_name: event.target.first_name.value,
            email: event.target.email.value,
            student: {
                school: event.target.school.value,
                grade: event.target.grade.value,
                subjects: [event.target.subjects.value],
            },
            text: "",
            user_type: "student",
        }

        const JSONstudentData = JSON.stringify(studentData)
        console.log(JSONstudentData)

        // const response = await fetch(`${process.env.BACKEND_URL}/api/students`, {
        const response = await fetch("http://localhost:8000/api/students/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSONstudentData,
        })

        const result = await response.json()
        // alert(result.message)
        router.push("/students")
    }
    return (
        // todo フォームをカスタマイズ
        <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">新規生徒登録</h2>

            <form onSubmit={handleSubmit}>
            {/*<form>*/}
                <div className="grid grid-cols-1 gap-6 mt-4">
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Username</label>
                        <input id="username" type="text" name="username"
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                    </div>

                    <div className="flex gap-4 mb-2">
                        <div className=" relative ">
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="last-name">姓</label>
                            <input type="text" id="last-name"
                                   className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                   name="last_name" placeholder="山田"/>
                        </div>

                        <div className=" relative ">
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="first-name">名</label>
                            <input type="text" id="first-name"
                                   className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                   name="first_name" placeholder="太郎"/>
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="email">Email Address</label>
                        <input id="email" type="email" name="email"
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

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="school">学校</label>
                        <input id="school" type="text" name="school"
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="grade">学年</label>
                        <input id="grade" type="text" name="grade"
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="subjects">やる教科</label>
                        <input id="subjects" type="text" name="subjects"
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
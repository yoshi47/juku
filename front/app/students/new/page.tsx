"use client";

import process from "process";
import {useRouter} from "next/navigation";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Option, Student} from "@type/types";
import Select from "react-select";
import {getSchools, getSubjects} from "@/lib/functions";

const URL = process.env.NEXT_PUBLIC_API_BASE_URL

const gradeOptionsMeta = {
    "小学校": [...Array(6)].map((_, i) => {
        return {value: i + 1, label: `${i + 1}年生`}
    }),
    "中学校": [...Array(3)].map((_, i) => {
        return {value: i + 7, label: `${i + 1}年生`}
    }),
    "高校": [...Array(3)].map((_, i) => {
        return {value: i + 10, label: `${i + 1}年生`}
    }),
    "既卒": [{value: 13, label: "既卒"}],
};


export default function AddStudent() {
    const router = useRouter()
    const [studentData, setStudentData] = useState<Student>({
        "username": "",
        "password": "st",
        "last_name": "",
        "first_name": "",
        "email": "",
        "student": {
            "school": "",
            "grade": "",
            "subjects": []
        },
        "text": "",
        "user_type": "student"
    });
    const [schoolOptions, setSchoolOptions] = useState<Option[]>([]);
    const [subjectOptions, setSubjectOptions] = useState<Option[]>([]);
    const [gradeOptions, setGradeOptions] = useState<Option[]>([]);

    useEffect(() => {
        getSchools(URL)
            .then(Schools => {
                const formattedSchool = Schools.map(school => ({
                    label: school.name,
                    value: school.name,
                }));
                setSchoolOptions(formattedSchool);
            })
            .catch(error => console.error(error));

        getSubjects(URL)
            .then(Subjects => {
                const formattedSubject = Subjects.map(subject => ({
                    label: subject.name,
                    value: subject.name,
                }));
                setSubjectOptions(formattedSubject);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if (studentData["student"].school) {
            if (studentData["student"].school.includes("小学校")) {
                setGradeOptions(gradeOptionsMeta["小学校"]);
            } else if (studentData["student"].school.includes("中学校")) {
                setGradeOptions(gradeOptionsMeta["中学校"]);
            } else if (studentData["student"].school.includes("高校")) {
                setGradeOptions(gradeOptionsMeta["高校"]);
            } else {
                setGradeOptions(gradeOptionsMeta["既卒"]);
            }
        }
    }, [studentData]);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setStudentData({
            ...studentData,
            [name]: value,
        });
    }

    const handleStudentChange = (name: string) => (option: any) => {
        setStudentData({
            ...studentData,
            student: {
                ...studentData.student,
                [name]: option.value,
            },
        });
        // console.log(studentData)
    };

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const JSONstudentData = JSON.stringify(studentData)
        // console.log(JSONstudentData)

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/students/`, {
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
        <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">新規生徒登録</h2>

            <form onSubmit={handleSubmit}>
                {/*<form>*/}
                <div className="grid grid-cols-1 gap-6 mt-4">
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Username</label>
                        <input id="username" type="text" name="username" value={studentData.username}
                               onChange={handleChange} autoComplete="off"
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                    </div>

                    <div className="flex gap-4 mb-2">
                        <div className=" relative ">
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="last-name">姓</label>
                            <input type="text" id="last-name" value={studentData.last_name} onChange={handleChange}
                                   autoComplete="off"
                                   className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                   name="last_name" placeholder="山田"/>
                        </div>

                        <div className=" relative ">
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="first-name">名</label>
                            <input type="text" id="first-name" value={studentData.first_name} onChange={handleChange}
                                   autoComplete="off"
                                   className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                   name="first_name" placeholder="太郎"/>
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="email">Email Address</label>
                        <input id="email" type="email" name="email" value={studentData.email} onChange={handleChange}
                               autoComplete="off"
                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                    </div>

                    <div>
                        <p className="text-gray-700 dark:text-gray-200 mb-1">学校</p>
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            options={schoolOptions}
                            name="subject"
                            onChange={handleStudentChange("school")}
                        />
                    </div>

                    <div>
                        <p className="text-gray-700 dark:text-gray-200 mb-1">学年</p>
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            options={gradeOptions}
                            name="grade"
                            onChange={handleStudentChange("grade")}
                        />
                    </div>

                    <div>
                        <p className="text-gray-700 dark:text-gray-200 mb-1">教科</p>
                        <Select
                            isMulti
                            className="basic-multi-select"
                            classNamePrefix="select"
                            options={subjectOptions}
                            name="subject"
                            onChange={handleStudentChange("subject")}
                        />
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
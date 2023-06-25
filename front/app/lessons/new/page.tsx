"use client";

import process from "process";
import {useRouter} from "next/navigation";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Option, PostLesson} from "@type/types";
import {getStudents, getSubjects, getTeachers} from "@/lib/functions";
import Select from "react-select";
// import {useAsync} from 'react-use';

const URL = process.env.NEXT_PUBLIC_API_BASE_URL


export default function AddLesson() {
    const router = useRouter()
    const [lessonData, setLessonData] = useState<PostLesson>({
        "student": "",
        "teacher": "",
        "subject": "",
        "period": 0,
        "date": ""
    });
    const [teacherOptions, setTeacherOptions] = useState<Option[]>([]);
    const [studentOptions, setStudentOptions] = useState<Option[]>([]);
    const [subjectOptions, setSubjectOptions] = useState<Option[]>([]);

    useEffect(() => {
        getTeachers(URL)
            .then(Teachers => {
                const formattedTeacher = Teachers.map(teacher => ({
                    label: teacher.last_name + " " + teacher.first_name,
                    value: teacher.username,
                }));
                setTeacherOptions(formattedTeacher);
            })
            .catch(error => console.error(error));

        getStudents(URL)
            .then(Students => {
                const formattedStudent = Students.map(student => ({
                    label: student.last_name + " " + student.first_name,
                    value: student.username,
                }));
                setStudentOptions(formattedStudent);
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

    const handleChange = (name: string) => (option: any) => {
        setLessonData({
            ...lessonData,
            [name]: option.value
        });
        // console.log(lessonData)
    };

    function handleDateChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setLessonData({
            ...lessonData,
            [name]: value,
        });
        // console.log(lessonData)
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const JSONlessonData = JSON.stringify(lessonData)
        console.log(JSONlessonData)

        const response = await fetch(`${process.env.URL}/api/lessons/`, {
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
        <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 w-1/3">
            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">授業登録</h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-4">
                    <div>
                        <p className="text-gray-700 dark:text-gray-200 mb-1">先生</p>
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            options={teacherOptions}
                            name="teacher"
                            onChange={handleChange("teacher")}
                        />
                    </div>

                    <div>
                        <p className="text-gray-700 dark:text-gray-200 mb-1">生徒</p>
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            options={studentOptions}
                            name="student"
                            onChange={handleChange("student")}
                        />
                    </div>

                    <div>
                        <p className="text-gray-700 dark:text-gray-200 mb-1">教科</p>
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            options={subjectOptions}
                            name="subject"
                            onChange={handleChange("subject")}
                        />
                    </div>

                    <div>
                        <p className="text-gray-700 dark:text-gray-200 mb-1">時限</p>
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            options={[...Array(8)].map((_, i) => {
                                return {value: i + 1, label: `${i + 1}限`}
                            })}
                            name="period"
                            onChange={handleChange("period")}
                        /></div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="date">日付</label>
                        <input id="date" type="date" name="date" value={lessonData.date} onChange={handleDateChange}
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
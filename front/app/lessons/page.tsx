"use client";

import {Lesson} from "@type/types";
import {FormatDate} from "@/lib/functions";
import React, {ChangeEvent, MouseEvent, useEffect, useRef, useState} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {MonthSelector} from "@components/Month-selector";


async function getLessons(date: Date) {
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

export default function LessonsList() {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [selectedDayLessons, setSelectedDayLessons] = useState<Lesson[]>([])
    const [date, setDate] = useState<Date>(new Date());
    const [month, setMonth] = useState<Date>(new Date());

    const formattedMonth = `${month.getFullYear()}-${('0' + (month.getMonth() + 1)).slice(-2)}`;
    const isFirstRender = useRef(false)

    useEffect(() => {
        isFirstRender.current = true
    }, [])

    // 日付で絞り込み
    useEffect(() => {
        // 初回は今月の予定一覧を表示させる（日付で絞り込まないように）
        if (isFirstRender.current) {
            isFirstRender.current = false
        } else {
            getLessons(date)
                .then(lessons => {
                    const filteredLessons = lessons.filter(lesson => {
                        // sv-SEロケールはYYYY-MM-DD形式の日付文字列を戻す
                        const lessonDate = date.toLocaleDateString('sv-SE')
                        return lessonDate === lesson["date"];
                    })
                    setLessons(lessons);
                    setSelectedDayLessons(filteredLessons);
                })
        }
    }, [date]);

    // 月で絞り込み
    useEffect(() => {
        getLessons(month)
            .then(lessons => {
                setSelectedDayLessons(lessons);
            })
    }, [month]);


    const handleMonthChange = (newMonth: Date): void => {
        setMonth(newMonth);
    };

    return (
        < div className=" flex flex-col items-center px-5 py-8 mx-auto lg:px-24">
            <MonthSelector month={month} handleMonthChange={handleMonthChange}/>

            < div className="flex flex-wrap py-8 md:flex-nowrap">

                < div className="prose md:flex-grow prose-md lg:pr-12">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light rounded-md">
                                    <thead className="border-b font-medium bg-green-100 dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">日にち</th>
                                        <th scope="col" className="px-6 py-4">時間</th>
                                        <th scope="col" className="px-6 py-4">生徒</th>
                                        <th scope="col" className="px-6 py-4">先生</th>
                                        <th scope="col" className="px-6 py-4">教科</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {selectedDayLessons.map((lesson) => (
                                        <tr key={lesson.id}
                                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                            {/* <td className="whitespace-nowrap px-6 py-4">{lesson.date}</td> */}
                                            <td className="whitespace-nowrap px-6 py-4"> {FormatDate(lesson.date)}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{lesson.period}時限目</td>
                                            <td className="whitespace-nowrap px-6 py-4">{lesson.student_name}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{lesson.teacher_name}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{lesson.subject}</td>
                                        </tr>
                                    ))}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-shrink-0 px-4 mb-6 md:w-64 md:mb-0">
                    <Calendar
                        onClickDay={setDate}
                        value={date}
                        calendarType="US"
                        locale="ja"
                        formatDay={(locale, date) => date.getDate().toString()}
                        // tileContent={getTileContent}
                    />
                </div>
            </div>
        </div>
    )
}
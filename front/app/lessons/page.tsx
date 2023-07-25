"use client";

import {Lesson} from "@type/types";
import React, {useEffect, useRef, useState} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {MonthSelector} from "@components/Month-selector";
import {LessonList} from "@components/Lesson-list";
import {useLessons} from "@/hooks/useLessons";

// import date from "react-calendar"


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

export default function LessonsPage() {

    const {
    // lessons,
    selectedDayLessons,
    date,
    month,
    handleMonthChange,
    isLessonDate,
    setDate,
    } = useLessons();

    return (
        < div className=" flex flex-col items-center px-5 py-8 mx-auto lg:px-24">
            <MonthSelector month={month} handleMonthChange={handleMonthChange}/>
            {/*todo 押さなくてもいいようにする*/}
            <p className="mt-3">カレンダーを一回押すと授業がある日がわかります</p>

            < div className="flex flex-wrap py-8 md:flex-nowrap">
                < div className="prose md:flex-grow prose-md lg:pr-12">
                    <LessonList selectedLessons={selectedDayLessons}/>
                </div>

                <div className="flex flex-col flex-shrink-0 px-4 mb-6 md:w-64 md:mb-0">
                    <Calendar
                        onClickDay={setDate}
                        onActiveStartDateChange={({activeStartDate}) => handleMonthChange(activeStartDate)}
                        activeStartDate={month}
                        value={date}
                        calendarType="US"
                        locale="ja"
                        formatDay={(locale, date) => date.getDate().toString()}
                        tileContent={({date, view}) => view === "month" ? isLessonDate(date) : null}
                    />
                </div>
            </div>
        </div>
    )
}
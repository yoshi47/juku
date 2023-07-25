import {useEffect, useRef, useState} from "react";
import {Lesson} from "@type/types";
import {getLessons} from "@/lib/functions";

export const useLessons = () => {
    // 選択している月にある授業を格納
    const [lessons, setLessons] = useState<Lesson[]>([]);
    // 選択した日にある授業を格納
    const [selectedDayLessons, setSelectedDayLessons] = useState<Lesson[]>([])
    const [date, setDate] = useState<Date>(new Date());
    const [month, setMonth] = useState<Date>(new Date());

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


    const handleMonthChange = (newMonth: Date | null): void => {
        if (newMonth) setMonth(newMonth);
    };

    const isLessonDate = (date: Date) => {
        const dateString = date.toLocaleDateString('sv-SE')

        if (lessons.some(lesson => lesson.date === dateString)) {
            return <p className="text-green-400">✔</p>
        }
    };

    return {
        lessons,
        selectedDayLessons,
        date,
        month,
        isLessonDate,
        setDate,
        handleMonthChange,
    };
}
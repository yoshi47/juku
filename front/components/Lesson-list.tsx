import {Lesson} from "@type/types";
import {FormatDate} from "@/lib/functions";
import React from "react";

type LessonListProps = {
    selectedLessons: Lesson[];
}

export const LessonList: React.FC<LessonListProps> = ({selectedLessons}) => {
    return (
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
                        {selectedLessons.map((lesson) => (
                            <tr key={lesson.id}
                                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
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
    );
};
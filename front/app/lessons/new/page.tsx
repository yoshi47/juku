"use client";

import {useRouter} from "next/navigation";

export default function CreateLesson() {
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            // student_username: event.target.student_username.value,
            // teacher_username: event.target.teacher_username.value,

        }
    }
}
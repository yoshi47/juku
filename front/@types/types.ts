export type Student = {
    username: string;
    last_name: string;
    first_name: string;
    email: string;
    student: {
        school: string;
        grade: string;
        subject: [string];
    }
    text: string;
};

export type Teacher = {
    username: string;
    last_name: string;
    first_name: string;
    email: string;
    text: string;
}

export type Lesson = {
    id: number;
    student_username: string;
    teacher_username: string;
    student: string;
    teacher: string;
    subject: string;
    period: number;
    date: string;
};
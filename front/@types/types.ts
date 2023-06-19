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
    student: string;
    student_name: string;
    teacher: string;
    teacher_name: string;
    subject: string;
    period: number;
    date: string;
};

export type UserInfo = {
    token_type: string;
    exp: number;
    iat: number;
    jti: string;
    user_id: number;
    username: string;
    name: string;
    role: string;
};
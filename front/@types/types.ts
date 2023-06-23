// export type Student = {
//     username: string;
//     last_name: string;
//     first_name: string;
//     email: string;
//     student: {
//         school: string;
//         grade: string;
//         subject: string[];
//     }
//     text: string;
// };

// export type Teacher = {
//     username: string;
//     last_name: string;
//     first_name: string;
//     email: string;
//     text: string;
// }


export type User = {
    username: string;
    password?: string;
    last_name: string;
    first_name: string;
    email: string;
    text: string;
    user_type?: string;
}

export type Student = User & {
    student: {
        school: string;
        grade: string;
        subjects: string[];
    }
};

export type Teacher = User;

export type PostLesson = {
    student: string;
    teacher: string;
    subject: string;
    period: number;
    date: string;
}

export type Lesson = PostLesson & {
    id: number;
    student_name: string;
    teacher_name: string;
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
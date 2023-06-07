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
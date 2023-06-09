export function FormatDate(date: string) {
    const formatedDate = new Date(date);
    return `${formatedDate.getMonth() + 1}/${formatedDate.getDate()}`;
}
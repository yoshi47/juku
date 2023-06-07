export function FormatDate({date}: {date: string}) {
    const formattedDate = new Date(date);
    return `${formattedDate.getMonth() + 1}/${formattedDate.getDate()}`
}
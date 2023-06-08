import React from "react";

export function FormatDate({date}: { date: string }) {
    const formattedDate = new Date(date);
    return (
        <div className="flex flex-col ml-10 mr-2 text-gray-600 dark:text-gray-200">
            {formattedDate.getMonth() + 1}/{formattedDate.getDate()}
        </div>
    )
}
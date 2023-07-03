import React from "react";

type MonthSelectorProps = {
    month: Date;
    handleMonthChange: (newMonth: Date) => void;
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({month, handleMonthChange}) => {
    const formattedMonth = `${month.getFullYear()}-${('0' + (month.getMonth() + 1)).slice(-2)}`;

    return (
        <div className="flex">
            <button type="button" onClick={() => handleMonthChange(new Date(month.getFullYear(), month.getMonth() - 1))}
                    className="flex items-center justify-center px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md rtl:-scale-x-100 dark:bg-gray-800 dark:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"/>
                </svg>
            </button>

            <input type="month" onChange={e => handleMonthChange(new Date(e.target.value))} value={formattedMonth}
                   className="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"/>

            <button type="button" onClick={() => handleMonthChange(new Date(month.getFullYear(), month.getMonth() + 1))}
                    className="flex items-center justify-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md rtl:-scale-x-100 dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"/>
                </svg>
            </button>
        </div>
    );
};
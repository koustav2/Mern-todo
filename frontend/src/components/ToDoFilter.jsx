/* eslint-disable react/prop-types */
export const TodoFilter = ({
    filter,
    changeFilter
}) => {

    return (
        <section className="container mx-auto mt-8">
            <div className="flex justify-center gap-4 p-4 transition-all duration-1000 bg-white rounded-md dark:bg-gray-800">
                <button
                    className={`${filter === "all"
                        ? "text-blue-500 hover:text-gray-400"
                        : "text-gray-400 hover:text-blue-500"
                        }`}
                    onClick={() => changeFilter("all")}
                >
                    All
                </button>
                <button
                    className={`${filter === "active"
                        ? "text-blue-500 hover:text-gray-400"
                        : "text-gray-400 hover:text-blue-500"
                        }`}
                    onClick={() => changeFilter("active")}
                >
                    Active
                </button>
                <button
                    className={`${filter === "completed"
                        ? "text-blue-500 hover:text-gray-400"
                        : "text-gray-400 hover:text-blue-500"
                        }`}
                    onClick={() => changeFilter("completed")}
                >
                    Completed
                </button>
            </div>
        </section>
    );
};


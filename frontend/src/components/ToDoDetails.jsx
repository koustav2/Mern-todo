/* eslint-disable no-unused-vars */

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
const ToDoDetails = ({ todos }) => {
    const clearAll = async () => {
        try {
            const res = await axios.delete("http://localhost:8000/api/todo/deleteAll");
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <section className="flex justify-between bg-white py-4 px-4 rounded-b-md dark:bg-gray-800 transition-all duration-1000">
            <span className="text-gray-400">{todos.length} items left</span>
            <button className="text-gray-400"
                onClick={clearAll}
            >
                Clear All
            </button>
        </section>
    );
};

export default ToDoDetails;
/* eslint-disable no-unused-vars */

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
const ToDoDetails = ({ todos ,clearAll}) => {

    return (
        <section className="flex justify-between px-4 py-4 transition-all duration-1000 bg-white rounded-b-md dark:bg-gray-800">
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
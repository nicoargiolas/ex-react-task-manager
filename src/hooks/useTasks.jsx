import { useState, useEffect } from "react";
import axios from "axios";

export default function useTasks() {
    const [tasks, setTasks] = useState([]);

    async function fetchJson(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data
    }

    const getTasks = async () => {
        try {
            const response = await fetchJson(`${import.meta.env.VITE_API_URL}/tasks`);
            setTasks(response);
        } catch (error) {
            throw new Error(`Impossibile recuperare le task`)
        }
    }

    useEffect(() => {
        getTasks();
    }, []);

    useEffect(() => {
        console.log("Tasks aggiornate:", tasks);
    }, [tasks]);

    const addTask = async (taskToAdd) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, taskToAdd, { headers: { "Content-Type": "application/json" } });
            if (response.data.success) {
                setTasks([...tasks, response.data.task])

            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            throw new Error(`Impossibile aggiungere la task`)
        }
    };

    const removeTask = () => { };
    const updateTask = () => { };

    return { tasks, addTask, removeTask, updateTask }
}
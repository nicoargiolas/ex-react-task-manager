import { useState, useEffect } from "react";

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
            throw new Error(`Non posso recuperare le task`)
        }
    }

    useEffect(() => {
        getTasks();
    }, []);

    useEffect(() => {
        console.log("Tasks aggiornate:", tasks);
    }, [tasks]);

    const addTask = () => { };
    const removeTask = () => { };
    const updateTask = () => { };

    return { tasks, addTask, removeTask, updateTask }
}
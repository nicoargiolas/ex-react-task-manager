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
                throw new Error(response.data.message)
            }
        } catch (error) {
            throw new Error(`Impossibile aggiungere la task`)
        }
    };

    const removeTask = async (taskId) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, { headers: { "Content-Type": "application/json" } });
            if (response.data.success) {
                setTasks(tasks.filter(t => t.id !== parseInt(taskId)));
            } else {
                throw new Error(response.data.message)
            }
        } catch (error) {
            throw new Error(`Impossibile rimuovere la task`)
        }
    };

    const updateTask = () => { };

    return { tasks, addTask, removeTask, updateTask }
}
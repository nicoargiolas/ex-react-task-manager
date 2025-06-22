import { useState, createContext, useEffect } from "react";

export const GlobalContext = createContext();

// Importazione hooks
import useTasks from "../hooks/useTasks";

export default function GlobalProvider({ children }) {

    const { tasks, addTask, removeTask, updateTask } = useTasks();

    return (
        <GlobalContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
            {children}
        </GlobalContext.Provider>
    )
}
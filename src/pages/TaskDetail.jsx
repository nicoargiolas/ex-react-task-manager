import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function TaskDetail() {
    const { id } = useParams();
    const { tasks } = useContext(GlobalContext);

    const task = tasks.find(t => t.id === parseInt(id));
    if (!task) {
        alert("Task non trovata")
    }

    return (
        <>
            <div>
                <h1> {task.title} </h1>
                <p> {task.description} </p>
                <p> {task.status} </p>
                <p> Data di creazione: {task.createdAt} </p>
                <button onClick={console.log("Elimino task")}> Elimina task </button>
            </div>
        </>
    )
}
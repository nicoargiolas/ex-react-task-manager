import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function TaskDetail() {
    const { id } = useParams();
    const { tasks, removeTask } = useContext(GlobalContext);

    const navigate = useNavigate();

    const task = tasks.find(t => t.id === parseInt(id));

    const handleDelete = async (id) => {
        try {
            await removeTask(id);
            navigate("/");
            alert("Task rimossa con successo!");
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <>
            <div>
                <h1> {task.title} </h1>
                <p> {task.description} </p>
                <p> {task.status} </p>
                <p> Data di creazione: {task.createdAt} </p>
                <button onClick={() => handleDelete(id)}> Elimina task </button>
            </div>
        </>
    )
}
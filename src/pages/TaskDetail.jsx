import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";

export default function TaskDetail() {
    const { id } = useParams();
    const { tasks, removeTask } = useContext(GlobalContext);

    const navigate = useNavigate();

    const task = tasks.find(t => t.id === parseInt(id));

    // Spostato il navigate fuori dall'handleDelete perché potrebbe causare problemi se si rimane sulla pagina dopo che i dati sono stati eliminati, quindi con useEffect al cambiare di task e navigate viene effettuato il navigate
    useEffect(() => {
        if (!task) {
            navigate("/");
        }
    }, [task, navigate]);

    const handleDelete = async (id) => {
        try {
            await removeTask(id);
            alert("Task rimossa con successo!");
        } catch (error) {
            alert(error.message)
        }
    }

    // Modale
    const [show, setShow] = useState(false);

    if (!task) return null; // evita crash durante il rendering

    return (
        <>
            <div>
                <h1> {task.title} </h1>
                <p> {task.description} </p>
                <p> {task.status} </p>
                <p> Data di creazione: {task.createdAt} </p>
                <button onClick={() => setShow(true)}> Elimina task </button>
            </div>
            <Modal
                title="Confermi?"
                content={`Vuoi eliminare la task ${task.title}?`}
                show={show}
                onClose={() => setShow(false)}
                onConfirm={() => handleDelete(id)}
            />
        </>
    )
}
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {
    const { id } = useParams();
    const { tasks, removeTask, updateTask } = useContext(GlobalContext);

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

    const handleSave = async (updatedTask) => {
        try {
            await updateTask(updatedTask);
            setUpdateShow(false);
            alert("Task modificata con successo!")
        } catch (error) {
            alert(error.message)
        }
    }

    // Modali
    const [deleteShow, setDeleteShow] = useState(false);
    const [updateShow, setUpdateShow] = useState(false);

    // Oggetto che gestisce il colore della casella in base allo stato, viene richiamato nella casella
    const colors = {
        'To do': '#e74c3c',   // rosso
        'Doing': '#f1c40f',   // giallo
        'Done': '#2ecc71'     // verde
    }

    if (!task) return null; // evita crash durante il rendering

    return (
        <>
            <div className="task-details">
                <div className="title-container">
                    <h1> {task.title} </h1>
                    <h1 className="detail-status"
                        style={{ backgroundColor: colors[task.status] }}> {task.status} </h1>
                </div>
                <p> {task.description} </p>
                <p> Data di creazione: {task.createdAt} </p>
                <div className="btn-container">
                    <button onClick={() => setDeleteShow(true)}> Elimina task </button>
                    <button onClick={() => setUpdateShow(true)}> Modifica task </button>
                </div>
            </div>
            <Modal
                title="Elimina Task"
                content={<p>{`Vuoi eliminare la task ${task.title}?`}</p>}
                show={deleteShow}
                onClose={() => setDeleteShow(false)}
                onConfirm={() => handleDelete(id)}
            />
            <EditTaskModal
                show={updateShow}
                onClose={() => setUpdateShow(false)}
                task={task}
                onSave={handleSave}
            />
        </>
    )
}
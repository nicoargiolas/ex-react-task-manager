import { useRef, useState, useEffect } from "react";
import Modal from "./Modal";

export default function EditTaskModal({
    show = false,
    onClose = () => { },
    task,
    onSave = () => { } }) {

    const editFormRef = useRef();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedTask = {
            ...task,
            title,
            description,
            status,
        };

        onSave(updatedTask);
    }

    return (
        <Modal
            title="Modifica Task"
            content={<form ref={editFormRef} onSubmit={handleSubmit}>
                <section>
                    <input type="text"
                        placeholder="Nome"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </section>

                <section>
                    <textarea
                        placeholder="Descrizione"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </section>

                <section>
                    <select value={status} onChange={e => setStatus(e.target.value)}>
                        <option value="To do"> To do </option>
                        <option value="Doing"> Doing </option>
                        <option value="Done"> Done </option>
                    </select>
                </section>

            </form>}
            confirmText="Salva"
            onConfirm={() => editFormRef.current.requestSubmit()}
            show={show}
            onClose={onClose}
        />
    )
}
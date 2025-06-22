import { useRef, useState, useMemo, useContext } from "react"
import { GlobalContext } from "../context/GlobalContext";


export default function AddTask() {
    const [title, setTitle] = useState("");
    const descRef = useRef();
    const statusRef = useRef();

    const { addTask } = useContext(GlobalContext)

    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

    const isTitleValid = useMemo(() => {
        return ![...title].some(c => symbols.includes(c))
    }, [title])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isTitleValid) {
            alert("Il nome della task non può includere simboli");
            return
        }
        try {
            await addTask({ 'title': title, 'description': descRef.current.value, 'status': statusRef.current.value });
            alert("Task aggiunta con successo!");

            // Reset Form
            setTitle("");
            descRef.current.value = "";
            statusRef.current.value = "To do"
        } catch (error) {
            alert(error.message);
        }

    }

    return (
        <>
            <h1> Pagina AddTask </h1>

            <form onSubmit={handleSubmit}>
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
                        ref={descRef} />
                </section>

                <section>
                    <select ref={statusRef}>
                        <option value="To do"> To do </option>
                        <option value="Doing"> Doing </option>
                        <option value="Done"> Done </option>
                    </select>
                </section>

                <button type="submit"> Aggiungi task </button>
            </form>
        </>
    )
}
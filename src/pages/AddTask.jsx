import { useRef, useState, useMemo } from "react"


export default function AddTask() {
    const [title, setTitle] = useState("");
    const descRef = useRef();
    const statusRef = useRef();

    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

    const isTitleValid = useMemo(() => {
        return ![...title].some(c => symbols.includes(c))
    }, [title])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (isTitleValid) {
            console.log(`Task aggiunta con i seguenti dati:
                Nome: ${title}
                Descrizione: ${descRef.current.value}
                Stato: ${statusRef.current.value}`);
        } else {
            alert("Il nome della task non può includere simboli")
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
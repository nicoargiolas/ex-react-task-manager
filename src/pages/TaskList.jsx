import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";

export default function TaskList() {
    const tasks = useContext(GlobalContext)

    return (
        <>
            <h1> Pagina TaskList </h1>
            <table>
                <thead>
                    <tr>
                        <th> Nome </th>
                        <th> Stato </th>
                        <th> Data di creazione </th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(t => <TaskRow key={t.id} {...t} />)}
                </tbody>
            </table>
        </>
    )
}
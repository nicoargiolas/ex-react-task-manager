import { useContext, useState, useMemo, useCallback, useRef, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";

export default function TaskList() {
    const { tasks } = useContext(GlobalContext);

    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const inputRef = useRef();

    function debounce(callback, delay) {
        let timer;
        return (value) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback(value)
            }, delay)
        }
    }

    const debouncedSearch = useCallback(debounce(() => {
        setSearchQuery(inputRef.current.value)
    }, 500), []);

    const handleSort = (col) => {
        if (col === sortBy) {
            setSortOrder(sortOrder * -1)
        } else {
            setSortBy(col);
            setSortOrder(1);
        }
    };

    const sortStatus = {
        "To do": 0,
        "Doing": 1,
        "Done": 2
    };

    const sortedTasks = useMemo(() => {
        const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(searchQuery.trim().toLowerCase()));
        return filteredTasks.sort((a, b) => {
            let result = 0;

            if (sortBy === "title") {
                result = (a.title.localeCompare(b.title));
            } else if (sortBy === "status") {
                result = (sortStatus[a.status] - sortStatus[b.status]);
            } else if (sortBy === "createdAt") {
                result = (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            }

            return result * sortOrder
        })
    }, [tasks, sortBy, sortOrder, searchQuery])


    return (
        <>
            <div className="tasklist-container">
                <div>
                    <input className="searchbar" type="text" placeholder="Cerca..." ref={inputRef} onChange={() => debouncedSearch()} />
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort("title")}> Nome {sortBy === 'title' ? (sortOrder === -1 ? '↑' : '↓') : ''}</th>
                                <th onClick={() => handleSort("status")}> Stato {sortBy === 'status' ? (sortOrder === -1 ? '↑' : '↓') : ''}</th>
                                <th onClick={() => handleSort("createdAt")}> Data di creazione {sortBy === 'createdAt' ? (sortOrder === -1 ? '↑' : '↓') : ''}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTasks.map(t => <TaskRow key={t.id} {...t} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
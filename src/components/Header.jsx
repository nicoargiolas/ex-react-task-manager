import { Link, NavLink } from "react-router-dom";

export default function Header() {
    return (
        <>
            <header>
                <div className="navbar">
                    <NavLink to={"/"}> Task List </NavLink>
                    <NavLink to={"/addtask"}> Add Task </NavLink>
                </div>
            </header>
        </>
    )
}
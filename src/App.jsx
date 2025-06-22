// Importazione Route
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";

// Importazione layout
import DefaultLayout from "./layouts/DefaultLayout";

// Importazione pagine
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";

// Importazione CSS
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<TaskList />} />
            <Route path="/addtask" element={<AddTask />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

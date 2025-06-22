// Importazione Route
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importazione layout
import DefaultLayout from "./layouts/DefaultLayout";

// Importazione provider
import GlobalProvider from "./context/GlobalContext";

// Importazione pagine
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";

// Importazione CSS
import './App.css'

function App() {

  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route index element={<TaskList />} />
              <Route path="/addtask" element={<AddTask />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App

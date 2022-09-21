import React from "react"
import ReactDOM from "react-dom/client"
import { IconContext } from "react-icons"
import App from "./App"
import TodoContextProvider from "./contexts/TodoContext"
import UserContextProvider from "./contexts/UserContext"
import "./styles/index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <IconContext.Provider value={{ className: "react-icons" }}>
    <UserContextProvider>
      <TodoContextProvider>
        <App />
      </TodoContextProvider>
    </UserContextProvider>
  </IconContext.Provider>
  // </React.StrictMode>
)

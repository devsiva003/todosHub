import React from "react"
import { IconContext } from "react-icons"
import TodoContextProvider from "./TodoContext"
import UserContextProvider from "./UserContext"

const GlobalContextProvider = ({ children }) => {
    return (
        <IconContext.Provider value={{ className: "react-icons" }}>
            <UserContextProvider>
                <TodoContextProvider>{children}</TodoContextProvider>
            </UserContextProvider>
        </IconContext.Provider>
    )
}

export default GlobalContextProvider

import { useContext } from "react"
import { TodoContext } from "../contexts/TodoContext"

const useTodoContext = () => {
    const context = useContext(TodoContext)
    if (!context) throw new Error("Accessing TodoContext outside of Provider")
    return context
}

export default useTodoContext

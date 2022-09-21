import axios from "axios"
import useTodoContext from "./useTodoContext"

const todoService = axios.create({
  baseURL: "/api/todos",
})

const useTodos = () => {
  const { todos, modifyingTodo, dispatch } = useTodoContext()

  todoService.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`

  const getTodos = async () => {
    dispatch({ type: "CLEAR_ERROR_MSG" })
    dispatch({ type: "TOGGLE_LOADING", payload: true })
    try {
      const { data } = await todoService.get()
      dispatch({ type: "SET_TODOS", payload: data.todos })
    } catch (err) {
      dispatch({
        type: "SET_ERROR_MSG",
        payload: `Error: ${err.response.data.message}`,
      })
      // console.log(err)
    }
    dispatch({ type: "TOGGLE_LOADING", payload: false })
  }

  const addTodo = async (name) => {
    let errorMsg = null
    try {
      const { data } = await todoService.post(null, { name })
      dispatch({ type: "ADD_TODO", payload: await data })
    } catch (err) {
      errorMsg = err.response.data.message
    }
    return errorMsg
  }

  const toogleTodoComplete = async (id) => {
    let errorMsg = null
    const currTodo = todos.filter((todo) => todo._id === id)[0]
    try {
      await todoService.patch(id, {
        isCompleted: !currTodo.isCompleted,
      })
      dispatch({ type: "TOGGLE_TODO_COMPLETE", payload: id })
    } catch (err) {
      // console.log(err.response.data.message || err.message)
      errorMsg = err?.response?.data?.message || err.message
    }
    return errorMsg
  }

  const setModifyingTodo = (id) => {
    dispatch({ type: "SET_MODIFYING_TODO", payload: id })
  }

  const clearModifyingTodo = () => {
    dispatch({ type: "CLEAR_MODIFYING_TODO" })
  }

  const modifyTodo = async (name) => {
    let resError = null
    const { _id } = modifyingTodo
    try {
      const { data } = await todoService.patch(_id, { name })
      // console.log(data)
      dispatch({ type: "MODIFY_TODO", payload: data })
      dispatch({ type: "CLEAR_MODIFYING_TODO" })
    } catch (err) {
      resError = err.response.data.message
    }
    return resError
  }

  const deleteTodo = async (id) => {
    let errorMsg = null
    try {
      /* const { data } =  */ await todoService.delete(id)
      // console.log(data)
      dispatch({ type: "REMOVE_TODO", payload: id })
    } catch (err) {
      // console.log(err.response.data.message)
      errorMsg = err?.response?.data?.message || err.message
    }
    return errorMsg
  }

  return {
    getTodos,
    addTodo,
    toogleTodoComplete,
    setModifyingTodo,
    clearModifyingTodo,
    modifyTodo,
    deleteTodo,
  }
}

export default useTodos

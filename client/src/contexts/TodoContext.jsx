import React, { useEffect } from "react"
import { createContext, useReducer } from "react"

export const TodoContext = createContext()

const todoReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case "TOGGLE_LOADING":
      return { ...state, isLoading: payload }

    case "SET_ERROR_MSG":
      return { ...state, errorMsg: payload }

    case "CLEAR_ERROR_MSG":
      return { ...state, errorMsg: null }

    case "SET_TODOS":
      return {
        ...state,
        todos: payload,
      }

    case "SET_MODIFYING_TODO":
      return {
        ...state,
        modifyingTodo: state.todos.filter((todo) => todo._id === payload)[0],
      }

    case "CLEAR_MODIFYING_TODO":
      return {
        ...state,
        modifyingTodo: null,
      }

    case "ADD_TODO":
      return { ...state, todos: [payload, ...state.todos] }

    case "MODIFY_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === payload._id ? payload : todo
        ),
      }
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter(({ _id }) => _id !== payload),
      }
    case "TOGGLE_TODO_COMPLETE":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === payload
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        ),
      }

    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: payload,
      }

    case "SET_FILTER_QUERY":
      return {
        ...state,
        filterQuery: payload,
      }

    case "CLEAR_FILTER_QUERY":
      return {
        ...state,
        filterQuery: {},
      }

    default:
      return state
  }
}

const TodoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: null,
    errorMsg: null,
    isLoading: true,
    modifyingTodo: null,
    filterQuery: {},
    searchQuery: "",
  })
  /* useEffect(() => {
    console.groupCollapsed("TODO CONTEXT")
    console.table(state)
    console.groupEnd()
  }, [state]) */
  return (
    <TodoContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TodoContext.Provider>
  )
}

export default TodoContextProvider

import jwtDecode from "jwt-decode"
import React, { createContext, useEffect, useReducer } from "react"

export const UserContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_LOADING":
      return { ...state, isLoading: action.payload }
    case "LOGIN":
    case "AUTH_VERIFY":
      return { ...state, user: action.payload }
    case "UPDATE_USER":
      return { ...state, user: { ...state.user, ...action.payload } }
    case "LOGOUT":
      return { ...state, user: null }
    default:
      return state
  }
}

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
    isLoading: true,
  })

  useEffect(() => {
    const verifyToken = () => {
      const token = localStorage.getItem("token") || null
      try {
        const decoded = jwtDecode(token)
        dispatch({ type: "AUTH_VERIFY", payload: decoded })
      } catch (err) {
        // console.log(err)
        localStorage.removeItem("token")
      }
    }
    verifyToken()
    dispatch({ type: "TOGGLE_LOADING", payload: false })
  }, [])

  /* useEffect(() => {
    console.groupCollapsed("USER CONTEXT")
    console.table(state)
    console.groupEnd()
  }, [state]) */

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider

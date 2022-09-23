import jwtDecode from "jwt-decode"
import React, { createContext, useEffect, useReducer, useState } from "react"
import { HiExclamationCircle } from "react-icons/hi"
import Toaster from "../components/Toaster"

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

  const [hasStorage, setHasStorage] = useState(true)

  useEffect(() => {
    const verifyToken = () => {
      try {
        const token = localStorage.getItem("token") || null
        const decoded = jwtDecode(token)
        dispatch({ type: "AUTH_VERIFY", payload: decoded })
      } catch (err) {
        // console.log(err.message)
        if (err.message.indexOf("localStorage") > -1) setHasStorage(false)
        else localStorage.removeItem("token")
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
      {!hasStorage && (
        <Toaster backdrop noTimeout position="center">
          <center>
            <HiExclamationCircle size={"5rem"} />
            <h4>Storage Permission Denied</h4>
          </center>
          <p>Our app doesn't work without cookies and/or storage</p>
          <p>
            Please make sure that your browser supports cookies and/or storage
            and it's enabled
          </p>
        </Toaster>
      )}
    </UserContext.Provider>
  )
}

export default UserContextProvider

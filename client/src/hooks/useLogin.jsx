import axios from "axios"
import { useState } from "react"
import useUserContext from "./useUserContext"

const useLogin = () => {
  const { dispatch } = useUserContext()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const login = async (email, password) => {
    // console.log("login hook")
    setIsLoading(true)
    setErrorMsg(null)
    try {
      let { data } = await axios.post("/api/users/signin", {
        email,
        password,
      })
      localStorage.setItem("token", data.token)
      dispatch({ type: "LOGIN", payload: data.user })
    } catch (err) {
      // console.log(err)
      setErrorMsg(err?.response?.data?.message || err.message)
    }
    setIsLoading(false)
  }
  return { isLoading, errorMsg, login }
}

export default useLogin

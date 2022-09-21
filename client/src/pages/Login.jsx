import React, { useRef } from "react"
import { Link } from "react-router-dom"
import useLogin from "../hooks/useLogin"
import useTitle from "../hooks/useTitle"

const Login = () => {
  useTitle("Log In")

  const { login, isLoading, errorMsg } = useLogin()
  const userEmailRef = useRef()
  const userPasswordRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(userEmailRef.current.value, userPasswordRef.current.value)
  }

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Log In</h2>
        <input
          type="email"
          id="userEmail"
          className="input-field"
          placeholder="enter email"
          required
          ref={userEmailRef}
        />
        <input
          type="password"
          id="userPassword"
          className="input-field"
          placeholder="enter password"
          required
          ref={userPasswordRef}
        />
        <button
          type="submit"
          className={`btn btn-submit ${isLoading ? "is-disabled" : ""}`}
        >
          <span>Log in</span>
        </button>
        {errorMsg && <div className="error-msg">{errorMsg}</div>}
      </form>
      <div className="form-info-msg">
        New to TodosHub,{" "}
        <Link to="/signup">
          <span>signup</span>
        </Link>{" "}
        now
      </div>
    </div>
  )
}

export default Login

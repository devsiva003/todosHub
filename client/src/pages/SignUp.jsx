import React, { useRef } from "react"
import { Link } from "react-router-dom"
import useSignup from "../hooks/useSignup"
import useTitle from "../hooks/useTitle"

const SignUp = () => {
  useTitle("Sign Up")

  const { isLoading, errorMsg, signup } = useSignup()
  const emailRef = useRef()
  const pwdRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(emailRef.current.value, pwdRef.current.value)
    signup(emailRef.current.value, pwdRef.current.value)
  }

  return (
    <div className="container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Sign Up</h2>
        <input
          type="email"
          id="userEmail"
          className="input-field"
          placeholder="enter email"
          ref={emailRef}
          required
        />
        <input
          type="password"
          id="userPassword"
          className="input-field"
          placeholder="enter password"
          ref={pwdRef}
          required
        />
        <button
          type="submit"
          className={`btn btn-submit ${isLoading ? "is-disabled" : ""}`}
        >
          Sign up
        </button>
        {errorMsg && <div className="error-msg">{errorMsg}</div>}
      </form>
      <div className="form-info-msg">
        Already have an account, <Link to="/login">login</Link> now
      </div>
    </div>
  )
}

export default SignUp

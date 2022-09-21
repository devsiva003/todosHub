import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { HiOutlinePencilAlt, HiOutlineX } from "react-icons/hi"
import useTitle from "../hooks/useTitle"
import useUserContext from "../hooks/useUserContext"

const UserProfile = () => {
  useTitle("Profile")
  const { user, dispatch } = useUserContext()
  const curEmailRef = useRef()
  const curPwdRef = useRef()
  const [focusedFields, setFocusedFields] = useState({
    email: false,
    pwd: false,
  })
  const [showSubmission, setShowSubmission] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (!focusedFields.email) curEmailRef.current.value = user?.email
    if (!focusedFields.pwd) curPwdRef.current.value = "*".repeat(8)
    setShowSubmission(focusedFields.email || focusedFields.pwd)
    setErrorMsg(!focusedFields.email && !focusedFields.pwd && "")
  }, [focusedFields])

  const handleFormSubmission = async (e) => {
    e.preventDefault()
    setErrorMsg(null)
    const formFields = [...e.target]
      .filter((el) => !el.readOnly && el.className === "input-field")
      .reduce((prev, cur) => ({ ...prev, [cur.name]: cur.value }), {})

    if (formFields?.newPassword?.length < 8)
      return setErrorMsg("Password atleast to have 8 characters")
    if (formFields?.newEmail === user?.email)
      return setErrorMsg("The email you entered is your current email")
    // console.log(formFields)
    setIsUpdating(true)
    try {
      const { data } = await axios.patch(
        "/api/users/update",
        {
          email: user.email,
          ...formFields,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      console.log(data)
      dispatch({ type: "UPDATE_USER", payload: data.user })
      localStorage.setItem("token", data.updatedToken)
      setShowSubmission(false)
      setFocusedFields({ email: false, pwd: false })
    } catch (err) {
      setErrorMsg(err.response?.data?.message || err.message)
    }
    setIsUpdating(false)
  }

  return (
    <div className="container user-profile">
      <h2>Your Profile</h2>
      {
        <form className="profile-update-form" onSubmit={handleFormSubmission}>
          <div className="group">
            <label htmlFor="userEmail">Email</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="userEmail"
                className="input-field"
                name="newEmail"
                ref={curEmailRef}
                readOnly={!focusedFields.email}
                required
              />
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setFocusedFields((prev) => ({
                    ...prev,
                    email: !prev.email,
                  }))
                }}
              >
                {!focusedFields.email ? <HiOutlinePencilAlt /> : <HiOutlineX />}
              </button>
            </div>
          </div>
          <div className="group">
            <label htmlFor="curUserPassword">Password</label>
            <div className="input-wrapper">
              <input
                type="password"
                className="input-field"
                name="newPassword"
                ref={curPwdRef}
                readOnly={!focusedFields.pwd}
                required
              />
              <button
                className="btn"
                type="button"
                onClick={() =>
                  setFocusedFields((prev) => ({
                    ...prev,
                    pwd: !prev.pwd,
                  }))
                }
              >
                {!focusedFields.pwd ? <HiOutlinePencilAlt /> : <HiOutlineX />}
              </button>
            </div>
          </div>
          {showSubmission && (
            <>
              <div className="group">
                <label htmlFor="curPassword">Current password</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    className="input-field"
                    name="password"
                    id="curPassword"
                    placeholder="enter your current password"
                    required
                  />
                </div>
              </div>
              <div className="group">
                <button
                  className={`btn btn-submit${
                    isUpdating ? " is-disabled" : ""
                  }`}
                  type="submit"
                >
                  Update
                </button>
              </div>
            </>
          )}
          {errorMsg && <div className="error-msg">{errorMsg}</div>}
        </form>
      }
    </div>
  )
}

export default UserProfile

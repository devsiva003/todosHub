import React, { useEffect, useRef, useState } from "react"
import {
  HiOutlineCheckCircle,
  HiOutlinePlusCircle,
  HiOutlineXCircle,
} from "react-icons/hi"
import useTodoContext from "../hooks/useTodoContext"
import useTodos from "../hooks/useTodos"

const TodoModifier = () => {
  const [todoName, setTodoName] = useState("")
  const inputRef = useRef()
  const [errorMsg, setErrorMsg] = useState(null)
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [showCancelBtn, setShowCancelBtn] = useState(false)
  const { addTodo, modifyTodo, clearModifyingTodo } = useTodos()
  const { modifyingTodo } = useTodoContext()

  useEffect(() => {
    setSubmitDisabled(
      todoName.trim() === "" || todoName.trim() === modifyingTodo?.name
    )
  }, [todoName])

  useEffect(() => {
    if (modifyingTodo) {
      setTodoName(modifyingTodo.name)
      inputRef.current.focus()
    } else {
      setTodoName("")
      inputRef.current.blur()
    }
    setShowCancelBtn(!!modifyingTodo)
    // console.log(modifyingTodo)
  }, [modifyingTodo])

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg(null)
    setSubmitDisabled(true)
    if (!todoName.replace(/^\s|\s$/g, "")) {
      setSubmitDisabled(false)
      setErrorMsg("Please enter something")
      return
    }
    if (todoName.replace(/^\s|\s$/g, "") === modifyingTodo?.name) {
      setSubmitDisabled(false)
      setErrorMsg("Please change something")
      return
    }
    if (modifyingTodo) {
      const resError = await modifyTodo(todoName)
      if (resError) setErrorMsg(resError)
      else setTodoName("")
    } else {
      const resError = await addTodo(todoName)
      // console.log("ERR:", resError)
      if (resError) setErrorMsg(resError)
      else {
        setTodoName("")
        inputRef.current.blur()
      }
    }
    setSubmitDisabled(false)
  }

  const handleCancelBtnClick = () => {
    clearModifyingTodo()
    setErrorMsg("")
  }

  return (
    <div className="container">
      <form className="todo-modifier-form" onSubmit={handleFormSubmit}>
        {showCancelBtn && (
          <div className="btn-wrap">
            <button
              type="button"
              onClick={handleCancelBtnClick}
              className="btn cancel-btn"
            >
              <HiOutlineXCircle />
              <span>cancel</span>
            </button>
          </div>
        )}
        <input
          type="text"
          className="input-field"
          placeholder="enter todo here"
          value={todoName || ""}
          onChange={(e) => setTodoName(e.target.value)}
          ref={inputRef}
        />
        <button
          type="submit"
          className={`btn submit-btn ${submitDisabled ? "is-disabled" : ""}`}
        >
          {modifyingTodo ? (
            <>
              <HiOutlineCheckCircle />
              <span>Update Todo</span>
            </>
          ) : (
            <>
              <HiOutlinePlusCircle />
              <span>Add Todo</span>
            </>
          )}
        </button>
        {errorMsg && <div className="error-msg">{errorMsg}</div>}
      </form>
    </div>
  )
}

export default TodoModifier

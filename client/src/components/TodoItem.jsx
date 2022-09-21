import { formatDistanceToNow } from "date-fns"
import React, { useEffect, useState } from "react"
import {
  HiBadgeCheck,
  HiOutlineBadgeCheck,
  HiOutlineClock,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from "react-icons/hi"
import useTodoContext from "../hooks/useTodoContext"
import useTodos from "../hooks/useTodos"
import Toaster from "./Toaster"

const TodoItem = ({ _id, name, isCompleted, modifiedAt }) => {
  const [errorMsg, setErrorMsg] = useState(null)
  const [isInActive, setIsInActive] = useState(false)
  const { toogleTodoComplete, setModifyingTodo, deleteTodo } = useTodos()
  const { modifyingTodo } = useTodoContext()

  useEffect(() => {
    setIsInActive(modifyingTodo?._id === _id)
  }, [modifyingTodo])

  const handleCompleteToggle = async (id) => {
    setErrorMsg(null)
    setIsInActive(true)
    const errorMsg = await toogleTodoComplete(id)
    setErrorMsg(errorMsg)
    setIsInActive(false)
  }

  const handleTodoModify = (id) => {
    setModifyingTodo(id)
  }

  const handleTodoDelete = async (id) => {
    setErrorMsg(null)
    setIsInActive(true)
    const errorMsg = await deleteTodo(id)
    setErrorMsg(errorMsg)
    setIsInActive(false)
  }

  return (
    <>
      <div
        className={`todo-item ${isCompleted ? "is-done" : ""} ${
          isInActive ? "is-inactive" : ""
        }`}
        data-todo-id={_id}
      >
        <span className="done-icon">
          {isCompleted ? <HiBadgeCheck /> : <HiOutlineBadgeCheck />}
        </span>
        <p className="todo-name" onClick={() => handleCompleteToggle(_id)}>
          {name}
        </p>
        <div className="btn-group">
          <button
            className="btn todo-edit-btn"
            onClick={() => handleTodoModify(_id)}
          >
            <HiOutlinePencilAlt />
            <span>Edit</span>
          </button>
          <button
            className="btn todo-delete-btn"
            onClick={() => handleTodoDelete(_id)}
          >
            <HiOutlineTrash />
            <span>Delete</span>
          </button>
        </div>
        <span className="modified-at">
          <HiOutlineClock />
          <span>{formatDistanceToNow(new Date(modifiedAt))}</span>
        </span>
      </div>
      {errorMsg && (
        <Toaster type="error">
          <span>{errorMsg}</span>
        </Toaster>
      )}
    </>
  )
}

export default TodoItem

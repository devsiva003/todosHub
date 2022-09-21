import React, { useEffect } from "react"
import useTodoContext from "../hooks/useTodoContext"
import useTodos from "../hooks/useTodos"
import Loader from "./Loader"
import TodoItem from "./TodoItem"
import TodosSearchFilter from "./TodosSearchFilter"

const TodosContainer = () => {
  const { isLoading, todos, errorMsg, filterQuery, searchQuery } =
    useTodoContext()
  const { getTodos } = useTodos()

  useEffect(() => {
    if (!todos || todos?.length === 0) {
      // console.log("load")
      getTodos()
    }
  }, [])

  if (isLoading) return <Loader />

  return (
    <div className="todos-wrapper">
      {todos.length > 0 && (
        <>
          <TodosSearchFilter />
          {todos.filter(
            (todo) =>
              new RegExp(searchQuery, "i").test(todo.name) &&
              todo[filterQuery.key] == filterQuery.value
          ).length === 0 && (
            <div className="container empty-msg">
              No{" "}
              {filterQuery.key === "isCompleted" &&
                (filterQuery.value ? "completed " : "pending ")}
              todos match {searchQuery && `with the query ${searchQuery}`}
            </div>
          )}
          {todos
            .filter(
              (todo) =>
                new RegExp(searchQuery, "i").test(todo.name) &&
                todo[filterQuery.key] == filterQuery.value
            )
            .map((todo) => (
              <TodoItem {...todo} key={todo._id} />
            ))}
        </>
      )}

      {todos.length === 0 && (
        <div className="container empty-msg">Your have no todos</div>
      )}

      {errorMsg && <div className="container error-msg">{errorMsg}</div>}
    </div>
  )
}

export default TodosContainer

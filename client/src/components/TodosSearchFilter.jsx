import React from "react"
import useTodoContext from "../hooks/useTodoContext"

const TodosSearchFilter = () => {
  const { filterQuery, dispatch } = useTodoContext()
  return (
    <div className="container todos-search-filters">
      <div className="search-bar">
        <input
          type="text"
          placeholder="type todo name to search"
          onKeyUp={(e) =>
            dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value })
          }
        />
      </div>
      <div className="filters-wrap">
        <input
          type="radio"
          name="todoTags"
          id="todosAll"
          onChange={() => dispatch({ type: "CLEAR_FILTER_QUERY" })}
          defaultChecked={!filterQuery.key}
        />
        <label className="tag" htmlFor="todosAll">
          All
        </label>
        <input
          type="radio"
          name="todoTags"
          id="todosCompleted"
          onChange={() =>
            dispatch({
              type: "SET_FILTER_QUERY",
              payload: { key: "isCompleted", value: true },
            })
          }
          defaultChecked={
            filterQuery.key === "isCompleted" && filterQuery.value
          }
        />
        <label className="tag" htmlFor="todosCompleted">
          Completed
        </label>
        <input
          type="radio"
          name="todoTags"
          id="todosPending"
          onChange={() =>
            dispatch({
              type: "SET_FILTER_QUERY",
              payload: { key: "isCompleted", value: false },
            })
          }
          defaultChecked={
            filterQuery.key === "isCompleted" && !filterQuery.value
          }
        />
        <label className="tag" htmlFor="todosPending">
          Pending
        </label>
      </div>
    </div>
  )
}

export default TodosSearchFilter

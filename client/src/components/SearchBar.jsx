import React from "react"
import useTodoContext from "../hooks/useTodoContext"

const SearchBar = () => {
  const { dispatch } = useTodoContext()

  return (
    <div className="container search-bar">
      <input
        type="text"
        placeholder="type todo name to search"
        onKeyUp={(e) =>
          dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value })
        }
      />
    </div>
  )
}

export default SearchBar

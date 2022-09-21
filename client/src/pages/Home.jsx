import React from "react"
import TodoModifier from "../components/TodoModifier"
import TodosContainer from "../components/TodosContainer"
import useTitle from "../hooks/useTitle"

function Home() {
  useTitle("Home")
  return (
    <div>
      <TodoModifier />
      <TodosContainer />
    </div>
  )
}

export default Home

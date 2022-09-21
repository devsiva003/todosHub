import React from "react"
import useTitle from "../hooks/useTitle"

const About = () => {
  useTitle("About")

  return (
    <div className="container about-page">
      <h2>About Todos Hub</h2>
      <ul>
        <li>
          TodosHub is simply a web app, that help to store your day to day tasks
          (todos)
        </li>
      </ul>
    </div>
  )
}

export default About

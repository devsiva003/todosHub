import React from "react"
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <h1>
            <Link to="/">
                Todos<span>Hub</span>
            </Link>
        </h1>
    )
}

export default Header

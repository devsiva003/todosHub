import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="container page-not-found">
            <br />
            <div>The page you looking for is not found</div>
            <div>
                <Link className="btn cta-btn" to="/">
                    Go Home
                </Link>
            </div>
            <br />
        </div>
    )
}

export default NotFound

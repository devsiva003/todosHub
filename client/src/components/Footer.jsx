import React from "react"
import {
  HiOutlineHome,
  HiOutlineInformationCircle,
  HiOutlineLogout,
  HiOutlineUserCircle,
} from "react-icons/hi"
import { Link, useLocation } from "react-router-dom"
import useLogout from "../hooks/useLogout"
import useUserContext from "../hooks/useUserContext"

const Footer = () => {
  const { user } = useUserContext()
  const { logout } = useLogout()
  const { pathname } = useLocation()

  return (
    <div className={`container footer ${!user ? "content-center" : ""}`}>
      <div>
        {!/^\/about/.test(pathname) && (
          <Link to="/about">
            <HiOutlineInformationCircle />
            <span>About App</span>
          </Link>
        )}

        {!/^\/(login|signup)?$/.test(pathname) && (
          <>
            {!/^\/about/.test(pathname) && <span> | </span>}
            <Link to="/">
              <HiOutlineHome />
              <span>Back To Home</span>
            </Link>
          </>
        )}
      </div>
      {user && (
        <div>
          {!/^\/profile/.test(pathname) && (
            <>
              <Link to="/profile">
                <HiOutlineUserCircle />
                <span>Your Profile</span>
              </Link>
              <span> | </span>
            </>
          )}
          <button className="btn btn-logout" onClick={() => logout()}>
            <HiOutlineLogout />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default Footer

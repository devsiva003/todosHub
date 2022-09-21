import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import "../styles/Toaster.css"

const ToasterComponent = ({
  msg,
  backdrop = false,
  position = "bottom-right",
  children,
  type,
  className = "",
  style,
  innerStyle,
}) => {
  const ToastWithoutBackdrop = () => (
    <div
      className={`toaster-wrap ${position} ${
        type ? "is-" + type : ""
      } ${className}`}
      style={{ ...style }}
    >
      {" "}
      <div className="toaster-inner" style={{ ...innerStyle }}>
        {children || msg}
      </div>
    </div>
  )

  return createPortal(
    !backdrop ? (
      <ToastWithoutBackdrop />
    ) : (
      <>
        <div className="toaster-backdrop" style={{ ...backdrop }}></div>
        <ToastWithoutBackdrop />
      </>
    ),
    document.body
  )
}

const Toaster = (props) => {
  const { timeout = 2500, noTimeout = false, isShown = true } = props
  const [isTimeLeft, setIsTimeLeft] = useState(true)

  useEffect(() => {
    !noTimeout && setTimeout(() => setIsTimeLeft(false), timeout)
  }, [])

  if ((!isTimeLeft && !noTimeout) || !isShown) return

  return <ToasterComponent {...{ ...props }} />
}

export default Toaster

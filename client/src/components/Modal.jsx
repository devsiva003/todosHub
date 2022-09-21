import React from "react"

import ReactModal from "react-modal"

ReactModal.setAppElement("#root")

const Modal = (props) => {
    const { noBackdrop, position = "bottom-right" } = props
    return (
        <ReactModal
            {...props}
            overlayClassName={`modal-backdrop ${noBackdrop ? "is-hidden" : ""}`}
            overlayElement={(props, contEl) => (
                <>
                    <div {...props}></div>
                    {contEl}
                </>
            )}
            contentElement={(props, el) => (
                <div {...props} className={`${props.className} ${position}`}>
                    {el}
                </div>
            )}
        />
    )
}

export default Modal

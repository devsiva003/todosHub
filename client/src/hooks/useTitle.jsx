import { useRef } from "react"
import { useEffect } from "react"

const useTitle = (title, noSuffix = false) => {
  const titleRef = useRef(document.title)
  useEffect(() => {
    if (!noSuffix && title && title !== "Todos Hub") title += " | Todos Hub"
    document.title = title
    return () => {
      document.title = titleRef.current
    }
  }, [])
  return
}

export default useTitle

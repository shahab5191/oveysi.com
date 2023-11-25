import { useEffect } from "react"
import "./App.css"
import { Desktop } from "./components/desktop/desktop"
import { useAppDispatch } from "./redux/hooks"
import { createFolder } from "./redux/slices/file-system"

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    document.addEventListener("contextmenu", (e: MouseEvent) => {
      e.preventDefault()
    })
  }, [])
  useEffect(() => {
    dispatch(createFolder({ address: [], name: "home" }))
    dispatch(createFolder({ address: [0], name: "shahab" }))
    dispatch(createFolder({ address: [0, 0], name: "Documents" }))
    dispatch(createFolder({ address: [0, 0], name: "Pictures" }))
    dispatch(createFolder({ address: [0, 0], name: "Music" }))
    dispatch(createFolder({ address: [0, 0], name: "Downloads" }))
    dispatch(createFolder({ address: [0, 0], name: "Videos" }))
  }, [dispatch])
  return (
    <div className="App">
      <Desktop></Desktop>
    </div>
  )
}

export default App

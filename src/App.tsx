import { useEffect } from "react"
import "./App.css"
import { Desktop } from "./components/desktop/desktop"

function App() {
  useEffect(() => {
    document.addEventListener("contextmenu", (e: MouseEvent) => {
      e.preventDefault()
    })
  }, [])
  return (
    <div className="App">
      <Desktop></Desktop>
    </div>
  )
}

export default App

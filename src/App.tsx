import { useEffect } from "react"
import "./App.css"
import { Desktop } from "./components/desktop/desktop"
import { useAppDispatch, useAppSelector } from "./redux/hooks"
import { createFolder, getRoot } from "./redux/slices/file-system"
import { getFolder } from "./utilities/file-system-utils"

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    document.addEventListener("contextmenu", (e: MouseEvent) => {
      e.preventDefault()
    })
  }, [])
  const rootFolder = useAppSelector((state) => getRoot(state))
  useEffect(() => {
    dispatch(createFolder({ address: ["/"], name: "home" }))
    dispatch(createFolder({ address: ["/", "home"], name: "shahab" }))
    dispatch(
      createFolder({ address: ["/", "home", "shahab"], name: "Documents" })
    )
    dispatch(
      createFolder({ address: ["/", "home", "shahab"], name: "Pictures" })
    )
    dispatch(createFolder({ address: ["/", "home", "shahab"], name: "Music" }))
    dispatch(
      createFolder({ address: ["/", "home", "shahab"], name: "Downloads" })
    )
    dispatch(createFolder({ address: ["/", "home", "shahab"], name: "Videos" }))
    getFolder(rootFolder, ["/",'home','shahab'])
  }, [dispatch, rootFolder])
  return (
    <div className="App">
      <Desktop></Desktop>
    </div>
  )
}

export default App

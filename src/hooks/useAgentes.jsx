import { useContext } from "react"
import AgenteContext from "../context/AgenteProvider"

const useAgentes = () => {
  return useContext(AgenteContext)
}

export default useAgentes;
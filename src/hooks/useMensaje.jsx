import { useContext } from "react"
import MensajeContext from "../context/MensajeProvider"

const useMensaje = () => {
  return useContext(MensajeContext)
}

export default useMensaje;
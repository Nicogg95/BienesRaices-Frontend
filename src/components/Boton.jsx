/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const Boton = ({href, texto, clases, funcion, form}) => {

  return (
    <>
      {form ? 
      (<>
        <input type="submit" className={`${clases} p-5 text-center uppercase font-bold cursor-pointer`} onClick={funcion} value={texto}/>
      </>)
      :
      (<>
        <Link to={href} className={`${clases} p-5 text-center uppercase font-bold border solid cursor-pointer`} onClick={funcion}>{texto}</Link>
      </>)
      }
    </>
  )
}

export default Boton
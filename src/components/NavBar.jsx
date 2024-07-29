/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import useAgentes from "../hooks/useAgentes"

const NavBar = ({clase}) => {

  const {agente, cerrarSesion} = useAgentes({})

  return (
    <nav className={`${clase} md:flex flex-col items-center gap-y-7 md:flex-row gap-x-5 justify-between text-md md:opacity-1`}>
        <Link to="/blog" className="hover:text-yellow-500 hover:font-bold text-xl">Blog</Link>
        <Link to="/nosotros" className="hover:text-yellow-500 hover:font-bold text-xl">Nosotros</Link>
        <Link to="/catalogo" className="hover:text-yellow-500 hover:font-bold text-xl">Anuncios</Link>
        <Link to="/contacto" className="hover:text-yellow-500 hover:font-bold text-xl">Contacto</Link>
        {agente._id && <Link className="hover:text-yellow-500 hover:font-bold text-xl" onClick={()=>cerrarSesion()}>Cerrar Sesion</Link>}
    </nav>
  )
}

export default NavBar
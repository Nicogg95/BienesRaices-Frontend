import { useEffect, useState } from "react"
import NavBar from "./NavBar"
import { Link, useLocation} from "react-router-dom"

const Header = () => {

    const [menu, setMenu] = useState(true)
    const [mostrarFondo, setMostrarFondo] = useState(false);
    const {pathname} = useLocation();

    const pantalla = window.innerWidth;
  
    useEffect(()=>{
        if(pantalla < 600){
          setMenu(false);
        }
    }, [pantalla])
    
    useEffect(()=>{
        const mostrar = () =>{
            if(pathname === "/inicio") {
                setMostrarFondo(true)
            } else {
                setMostrarFondo(false)
            }
        }
        mostrar()
    }) 

    const handleClick = () =>{
        setMenu(!menu)
    }

  return (
    <>
        <div className={`${mostrarFondo ? "bg-[url('../img/header.jpg')] bg-center bg-cover min-h-[28rem] md:min-h-[35rem] p-10" : "bg-[#292929] p-5"} flex flex-col justify-between`}>
            <div className="flex flex-col md:flex-row items-center gap-5 justify-between">
                <Link to="/inicio">
                    <img src="../img/logo.svg" alt="logo bienes raices" className="w-64" />
                </Link>
                <Link onClick={()=>handleClick()}>
                    <img src="../img/barras.svg" alt="icono menu" className="w-8 md:hidden"/>
                </Link>
                <NavBar clase={`${!menu ? "hidden" : "flex"} p-5 md:gap-x-10`}/>
            </div>
            {mostrarFondo && <h1 className="text-center text-3xl uppercase font-bold">Venta/alquiler de casas y departamentos de lujo</h1>}        
        </div>
    </>
  )
}

export default Header;
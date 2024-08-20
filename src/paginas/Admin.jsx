import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import FormPropiedad from "../components/FormPropiedad"
import Boton from "../components/Boton"
import Mensajes from "../components/Mensajes"
import SecAnuncios from "../components/SecAnuncios"
import Perfil from "../components/Perfil"
import SecBlog from "./SecBlog"
import usePropiedades from "../hooks/usePropiedades"
import ModalFiltro from "../components/ModalFiltro"

const Admin = () => {

  // ------ Variables ------ 

  const [perfil, setPerfil] = useState(false);
  const [catalogo, setCatalogo] = useState(true);
  const [blog, setBlog] = useState(false);
  const [contacto, setContacto] = useState(false);
  const [movil, setMovil] = useState(false);
  const [mostrarForm, setMostrarForm] = useState(true)
  const [buscador, setBuscador] = useState(false);
  const [buscar, setBuscar] = useState("");
  const {buscarPropiedades, mostrarModal, setMostrarModal} = usePropiedades();
  const invisible = "hidden";
  const visible = "block";
  const pantalla = window.innerWidth;

  // ------ Funciones ------ 

  useEffect(()=>{
      if(pantalla < 600){
        setMovil(true);
        setMostrarForm(false);
      }
  }, [movil, pantalla])

  const modalFiltro = () =>{
    setMostrarModal(!mostrarModal);
  }
  const handleClickBuscar = () =>{
    setBuscador(!buscador);
  }
  const handleClickForm = () => {
    setMostrarForm(!mostrarForm)
  }
  const mostrarCatalogo = () =>{

    setBlog(false)
    setCatalogo(true)
    setContacto(false)
    setPerfil(false)

  }
  const mostrarPerfil = () =>{

    setBlog(false)
    setCatalogo(false)
    setContacto(false)
    setPerfil(true)

  }
  const mostrarBlog = () =>{

    setBlog(true)
    setCatalogo(false)
    setContacto(false)
    setPerfil(false)

  }
  const mostrarContacto = () =>{

    setBlog(false)
    setCatalogo(false)
    setContacto(true)
    setPerfil(false)

  }

  return (

    <div className="mx-auto px-3 w-12/12 md:w-11/12 my-10 min-h-screen">
      <h1 className="text-center font-bold uppercase text-3xl mb-10">Bienvenido a la seccion de Administradores</h1>

    {/* ------------- Barra de navegacion ------------- */}

      <nav className="flex flex-col md:flex-row text-center gap-y-5 md:justify-around my-10 border solid rounded-lg p-5 w-8/12 mx-auto">
        <Link onClick={()=>mostrarCatalogo()} className="hover:text-xl font-bold">Propiedades</Link>
        <Link onClick={()=>mostrarPerfil()} className="hover:text-xl font-bold">Perfil</Link>
        <Link onClick={()=>mostrarBlog()} className="hover:text-xl font-bold">Blog</Link>
        <Link onClick={()=>mostrarContacto()} className="hover:text-xl font-bold">Contacto</Link>
      </nav>

    {/* ------------- Seccion Propiedades ------------- */}

      <div className={`${catalogo ? `${visible} md:grid` : invisible} md:grid-cols-6 bg-zinc-800 rounded-xl shadow shadow-white`}>

          {/* ------ Seccion Formulario para propiedades ------ */}

        <div className="flex flex-col justify-center items-center md:col-span-2 w-full py-8">
          {movil && 
            <Boton texto={!mostrarForm? "Agregar propiedad": "Ocultar Formulario"} 
                  clases={"bg-lime-600"} 
                  funcion={()=>handleClickForm()}/>
          }
          {mostrarForm && <FormPropiedad />}
        </div>

          {/* ------ Seccion Catalogo de propiedades ------ */}

        <div className="flex flex-col m-5 md:col-span-4 col-span-6">
          <div className="flex flex-col md:flex-row gap-5 items-center w-full justify-center">

            {!buscador? 
              (<h2 className="font-bold text-center text-2xl my-5">Aqui podra ver todo el catalogo disponible 
              </h2>) 
              : 
              (<input className="p-3 text-white rounded-md bg-black border text-center w-10/12 my-5" placeholder="¿Que esta buscando?" onChange={e=>setBuscar(e.target.value)} onKeyUp={()=>buscarPropiedades(buscar)} value={buscar}/>)}

            <div className="flex flex-row gap-20 md:gap-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                  viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer" onClick={()=>handleClickBuscar()}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer"
              onClick={modalFiltro}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
              </svg>
            </div>

            {mostrarModal && <ModalFiltro />}
          </div>  
          <div className="md:overflow-scroll md:h-[65rem]">
            <SecAnuncios admin/>          
          </div>
        </div>
      </div>

    {/* ------------- Seccion Perfil ------------- */}

      <div className={`${perfil ? visible : invisible} grid md:grid-cols-6 md:gap-x-5 px-5 py-8 bg-zinc-800 rounded-xl shadow shadow-white`}>
        <Perfil />
      </div>

    {/* ------------- Seccion Blog ------------- */}

      <div className={`${blog ? visible : invisible} grid bg-zinc-800 rounded-xl shadow shadow-white`}>
        <SecBlog />
      </div>

    {/* ------------- Seccion Mensajes ------------- */}

      <div className={`${contacto ? visible : invisible} grid bg-zinc-800 rounded-xl p-8 shadow shadow-white`}>
        <Mensajes />
      </div>
    </div>
  )
}

export default Admin
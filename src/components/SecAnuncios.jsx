/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Anuncio from "./Anuncio"
import usePropiedades from "../hooks/usePropiedades"
import { useEffect, useState } from "react";
import ModalFiltro from "./ModalFiltro";
import { useLocation } from "react-router-dom";

const SecAnuncios = ({admin, cantidad}) => {

  const {propiedades,buscarPropiedades, mostrarModal, setMostrarModal} = usePropiedades();
  const [buscador, setBuscador] = useState(false);
  const [mostrarFiltros, setMostrarFiltros] = useState(true)
  const [buscar, setBuscar] = useState("");
  const {pathname} = useLocation();
  const fin = cantidad;

  const modalFiltro = () =>{
    setMostrarModal(!mostrarModal);
  }
  const handleClickBuscar = () =>{
    setBuscador(!buscador);
  }

  useEffect(()=>{
    const mostrar = () =>{
        if(pathname === "/") {
          setMostrarFiltros(false)
        } 
    }
    mostrar()
}) 


  return (
    <>
      <div className="md:px-5 mx-auto">
        
        {!admin &&
          (
          <div className="flex flex-col md:flex-row items-center mb-10 justify-center gap-5">
          
            {!buscador? 
              ( <h2 className="text-3xl col-span-6">
                Nuestro Catalogo
              </h2>)
              : 
              (<input className="p-3 text-white rounded-md bg-black border text-center w-full md:w-5/12" placeholder="¿Que esta buscando?" onChange={e=>setBuscar(e.target.value)} onKeyUp={()=>buscarPropiedades(buscar)} value={buscar}/>)}
            {mostrarFiltros &&
            <div className="flex md:gap-5 gap-16">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                  viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer" onClick={()=>handleClickBuscar()}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer"
              onClick={modalFiltro}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
              </svg>
            </div>
            }

            {mostrarModal && <ModalFiltro />}
          </div>)
        }

        <div className={`${admin ? "gap-10 my-8 md:col-span-2 grid md:grid-cols-2" : "grid px-5 md:grid-cols-3 gap-8"}`}>
          {propiedades.slice(0, fin).map(propiedad => (
            <Anuncio admin={admin}  
              key={propiedad._id}
              propiedad={propiedad}/>
          ))}    
        </div>

      </div>
    </>
  )
}

export default SecAnuncios
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react"
import clienteAxios from "../config/axios";

const PropiedadesContext = createContext()

export const PropiedadesProvider = ({children}) => {

    const [propiedad, setPropiedad] = useState({});
    const [propiedades, setPropiedades] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    
    useEffect(()=>{

        obtenerPropiedades();
       
    }, [propiedades])

    const obtenerPropiedades = async () => {
        try{
            const {data} = await clienteAxios("/propiedades/catalogo")
            setPropiedades(data)
        }catch(error){
            console.log(error);
        }
    }

    const guardarPropiedad = async(propiedad, imagen) =>{

        const token = localStorage.getItem("token");

        if(!token) return;

        const config = {
            headers: {
                "Content-Type": `${!imagen.includes("") ? "multipart/form-data" : "application/json"}`,
                Authorizarion: `Bearer ${token}`
            }
        }

        if(propiedad.id){

            try{
                const {data} = await clienteAxios.put(`/propiedades/editar/${propiedad.id}`, propiedad, token)
                const actualizado = propiedades.map(propiedadState => propiedadState._id === data._id ? data : propiedadState)
    
                setPropiedades(actualizado);
            }catch(error){
                console.log(error);
            }
        
        } else {

            try{

                propiedad.imagen = imagen;

                const {data} = await clienteAxios.post("/propiedades/agregar", propiedad, config)
                const propiedadNueva = data;
             
                setPropiedades([propiedadNueva, ...propiedades])
            }catch(error){
                console.log(error.response.data.msg);
            }
        }
    }

    const buscarPropiedades = async(valor) =>{

        if(!valor){
            obtenerPropiedades();
        } else {

            try{
                const {data} = await clienteAxios(`/propiedades/buscar/${valor}`)
        
                setPropiedades(data);
            }catch(error){
                console.log()
            }

        }

    }

    const setEdicion = (propiedad) =>{
        setPropiedad(propiedad)
    }

    const eliminarPropiedad = async(id) => {

        const token = localStorage.getItem("token");

        if(!token) return;

        const config = {
            headers: {
                Authorizarion: `Bearer ${token}`
            }
        }

        try{
            const {data} = await clienteAxios.delete(`/propiedades/eliminar/${id}`, config)
        }catch(error){
            console.log(error);
        }

        obtenerPropiedades();

    }

    const filtrarPropiedades = async(valor) =>{

        try{

            const {data} = await clienteAxios.post(`propiedades/filtrar`, valor);
            setPropiedades(data)

        }catch(error){
            console.log(error)
        }

    }

    return (
        <PropiedadesContext.Provider
        value={{
            propiedad, 
            propiedades, 
            setPropiedades,
            setPropiedad, 
            guardarPropiedad,
            eliminarPropiedad,
            setEdicion, 
            buscarPropiedades,
            setMostrarModal, mostrarModal,
            filtrarPropiedades
        }}>
            {children}
        </PropiedadesContext.Provider>
    )
}

export default PropiedadesContext;
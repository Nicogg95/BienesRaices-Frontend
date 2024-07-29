/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import { useNavigate } from "react-router-dom";

const AgenteContext = createContext();

const AgenteProvider = ({children}) => {
  
    const [agente, setAgente] = useState({});
    const [cargando, setCargando] = useState(true)
    const navigate = useNavigate();

    
    useEffect(()=>{

        const autenticarUsuario = async() =>{

            const token = localStorage.getItem("token");

            if(!token) {
                setCargando(false)
                return
            }
            
            const config = {

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try{
                const {data} = await clienteAxios("/agentes/", config);
                setAgente(data)
            }catch(error){
                console.log(error.response.data.msg)
                setAgente({})
            }
            setCargando(false)
        }
        autenticarUsuario();

    }, [agente])


    const iniciarSesion = async(datos) =>{

        const config = {

            headers: {
                "Content-Type" : "application/json"
            }
        }

        try{
            const {data} = await clienteAxios.post("/agentes/login", datos, config);
            localStorage.setItem("token", data.token)
            console.log(data)
            setAgente(data)
            navigate("/admin")

        }catch(error){
            return error.response.data.msg
        }

    }

    const registrarse = async(agente, foto) =>{

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        agente.foto = foto;

        try{
            const {data} = await clienteAxios.post("/agentes/", agente, config);
            console.log(data)
        }catch(error){
            console.log(error)
        }
    }

    const editarPerfil = async(agente, foto) =>{

        const token = localStorage.getItem("token")
        if(!token) return

        const config = {
            headers:{
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }

        agente.foto = foto;

        try{

            const {data} = await clienteAxios.put(`/agentes/${agente._id}`, agente, config)

            return {
                msg: "Datos actualizados con exito"
            }


        }catch(error){
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const cerrarSesion = () =>{
        localStorage.removeItem("token");
        navigate("/")
        setAgente({})
    }


    return (
       <AgenteContext.Provider
       value={{
        iniciarSesion, 
        registrarse, agente, 
        cerrarSesion, editarPerfil,
        cargando}}>
        {children}
       </AgenteContext.Provider>
    )
}

export {
    AgenteProvider
}

export default AgenteContext;
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";

const MensajeContext = createContext();

export const MensajeProvider = ({children}) => {

    const [mensaje, setMensaje] = useState({});
    const [mensajes, setMensajes] = useState([]);

    const crear = async(mensaje) =>{

        try{
            const {data} = await clienteAxios.post("/mensajes/", mensaje);
            const mensajeNuevo = data;
            setMensajes([mensajeNuevo, ...mensajes])

        }catch(error){
            console.log(error)
        }

    }

    useEffect(()=>{
        const verMensajes = async() =>{

            const token = localStorage.getItem("token");

            if(!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorizarion: `Bearer ${token}`
                }
            }

            try{
                const {data} = await clienteAxios("/mensajes/", config);
                setMensajes(data)
            }catch(error){
                console.log(error);
            } 
        }
        verMensajes();
    }, [mensajes])


    return(
        <MensajeContext.Provider value=
            {{crear, mensajes}}>
            {children}
        </MensajeContext.Provider>

    )

}

export default MensajeContext;


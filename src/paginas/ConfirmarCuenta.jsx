import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const ConfirmarCuenta = () => {

    const navigate = useNavigate();
    const [alerta, setAlerta] = useState({})
    const [confirmado, setConfirmado] = useState(false);
    const [cargando, setCargando] = useState(true)
  
    const params = useParams();
    const {token} = params;

    useEffect(()=>{

        const confirmarCuenta = async() =>{

            try{
                const {data} = await clienteAxios(`/agentes/confirmar/${token}`)
                setConfirmado(true);
                setAlerta({msg: "Cuenta confirmada"})
    
    
            }catch(error){
                setAlerta({msg: error.response.data.msg, error:true})
            }

            setCargando(false);
        }      
        
        confirmarCuenta();
        
    }, [token])

    const {msg} = alerta;

    setTimeout(() => {
        navigate("/");
    }, 3000);

  return (
    <>
        <div className="container mx-auto my-10 px-10 h-screen">
            <h1 className="text-center text-3xl mb-10">Estamos confirmando tu cuenta...</h1>
            {msg && 
                <Alerta alerta={alerta}/>
            }

            <h2 className="text-center text-3xl mt-10">Te redireccionaremos en unos segundos...</h2>
        </div>
    </>
  )
}

export default ConfirmarCuenta
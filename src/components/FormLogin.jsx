import { useState } from "react"
import Alerta from "./Alerta"
import Campo from "./Campo"
import useAgentes from "../hooks/useAgentes"
import Ping from "./Ping"
import Boton from "./Boton"
import { useNavigate } from "react-router-dom"

const FormLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alerta, setAlerta] = useState({})
    const {iniciarSesion} = useAgentes()
    const navigate = useNavigate()
    const ubicacion = "-top-[50px] left-[21rem] md:left-[18rem] sm:left-[10rem] xl:left-[34rem] lg:left-[26rem] 2xl:left-[38rem]";

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(!email || !password){
            setAlerta({msg:"Debe completar todos los campos", error:true})
            setTimeout(() => {
                setAlerta({})
            }, 3000);
            return
        }

        iniciarSesion({email, password});
        setTimeout(() => {
            navigate("/admin")
        }, 3000);
        
        limpiarForm();

    }

    const limpiarForm = () =>{

        setEmail("")
        setPassword("")
        setAlerta({})
    }

    const {msg} = alerta;
    
  return (
    <>
        <div className={`flex flex-col justify-center items-center  col-span-2 md:col-span-1 -translate-x-[0rem]`}>
            <h1 className="text-center text-2xl my-5">Complete el formulario para Iniciar sesion </h1>
            <form action="" className="w-full" onSubmit={handleSubmit} encType="multipart/form-data">
            
                <Campo texto={"Email:"} tipo={"email"} 
                placeholder={"Ingrese su email"} clases={"max-w-[580px] mx-auto"}
                valor={email} funcion={e=>{setEmail(e.target.value)}}/>

                <Ping ubicacion={ubicacion} 
                    input={email} />
                
                <Campo texto={"Password:"} tipo={"password"} 
                placeholder={"Ingrese su password"} clases={
                    "max-w-[580px] mx-auto"}
                valor={password} funcion={e=>{setPassword(e.target.value)}}/>

                <Ping ubicacion={ubicacion} input={password} />

                <div className="my-5 flex flex-col-reverse md:flex-row  justify-center gap-y-5 gap-x-20">
                    
                    <div className="flex items-center md:w-56 px-1 justify-center border bg-lime-600">
                        <Boton texto={"Iniciar sesion"} clases={""} form={true}/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                        </svg>
                    </div>

                    <div className="border flex items-center md:w-52 gap-x-3 p-6 justify-center bg-slate-800">
                        <button type="button" className="uppercase font-semibold cursor-pointer" onClick={()=>limpiarForm()}>Limpiar</button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </div>
                </div>

            </form>

            {msg &&
                <div className="flex justify-center">
                    <Alerta alerta={alerta}/>  
                </div>
            }
        </div>
        <div className={`col-start-2 row-start-1 col-span-1 hidden md:flex my-10`}>
            <img src="../img/blog3.jpg" alt="" className="w-5/6 h-fit rounded-md mx-auto"/> 
        </div>
    </>
 )
}

export default FormLogin
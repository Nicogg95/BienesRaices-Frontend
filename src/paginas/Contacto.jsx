/* eslint-disable no-unused-vars */
import Campo from "../components/Campo"
import Boton from "../components/Boton"
import { useState } from "react"
import Alerta from "../components/Alerta"
import useMensaje from "../hooks/useMensaje"

const Contacto = () => {

    const [contacto, setContacto] = useState("");
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [fecha, setFecha] = useState("");
    const [desdeHora, setDesdeHora] = useState("");
    const [hastaHora, setHastaHora] = useState("");
    const [operacion, setOperacion] = useState("");
    const [presupuesto, setPresupuesto] = useState("");
    const [alerta, setAlerta] = useState({});
    const {crear} = useMensaje();

    const handleSubmit = (e) =>{

        e.preventDefault();

        if(!nombre || !telefono || !email || !mensaje || !operacion || !presupuesto) {

            setAlerta({msg: "Debe completar todos los campos", error: true})
            setTimeout(() => {
                setAlerta({})
            }, 3000);
            return
        }

        const medioContacto = {fecha, desdeHora, hastaHora}

        crear({nombre, telefono, email, mensaje, operacion, presupuesto, medioContacto, contacto})
        setAlerta({msg:"Mensaje Enviado", error: false})
        setTimeout(() => {
            setAlerta({})
        }, 3000);
        limpiarForm()
    }

    const limpiarForm = () =>{

        setContacto("")
        setMensaje("")
        setNombre("")
        setEmail("")
        setTelefono("")
        setFecha("")
        setDesdeHora("")
        setHastaHora("")
        setOperacion("")
        setPresupuesto("")
        setAlerta({})
    }

    const {msg} = alerta;

  return(
    <>
        <div className="flex flex-col gap-y-10 container mx-auto p-10">
            <h1 className="text-center text-3xl uppercase font-bold">Contactenos!</h1>
            <img src="../img/destacada3.jpg" alt="imagen-contacto" className="md:w-9/12 mx-auto rounded-xl border border-gray-500"/>
            <form action="" onSubmit={handleSubmit} className="w-10/12 mx-auto">
                <Campo tipo={"text"} placeholder={"Ingrese su nombre"} texto={"Nombre:"} valor={nombre} funcion={e=>setNombre(e.target.value)}/>
                <Campo tipo={"tel"} placeholder={"Ingrese su telefono"} texto={"Telefono:"} valor={telefono} funcion={e=>setTelefono(e.target.value)}/>
                <Campo tipo={"email"} placeholder={"Ingrese su email"} texto={"Email:"} valor={email} funcion={e=>setEmail(e.target.value)}/>
                <Campo tipo={"text"} placeholder={"Ingrese su mensaje"} texto={"Mensaje:"} valor={mensaje} funcion={e=>setMensaje(e.target.value)}/>
                <div className="flex flex-col md:flex-row gap-y-5 md:justify-around items-center">
                    <div className="flex md:flex-row flex-col md:items-center gap-5 w-full">
                        <label htmlFor="" className="block font-bold">Tipo de operacion:</label>
                        <select name="operacion" id="operacion" className="p-3 bg-black border solid border-gray-700 hover:border-white rounded-lg w-full text-center" onChange={e=>setOperacion(e.target.value)} value={operacion}>
                            <option value="" disabled selected>--SELECCIONAR--</option>
                            <option value="venta">Venta</option>
                            <option value="compra">Compra</option>
                            <option value="alquiler">Alquiler</option>
                        </select>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-3 w-full">
                        <label htmlFor="" className="font-bold">Precio o presupuesto:</label>
                        <Campo tipo={"number"} funcion={e=>setPresupuesto(e.target.value)} valor={presupuesto}/>
                    </div> 
                </div>
            
                <div className="flex flex-col md:flex-row gap-10 my-10 items-center">
                    <h2 className="font-bold">Medio de contacto: </h2> 
                    <div className="flex gap-x-14">
                        <div className="flex items-center justify-center gap-x-5">
                            <label htmlFor="">Email:</label>
                            <input name="contacto" type="radio" onChange={e=>setContacto(e.target.value)} value="email"/>
                        </div>
                        <div className="flex items-center gap-x-5">
                            <label htmlFor="">Telefono:</label>
                            <input name="contacto" type="radio"  onChange={e=>setContacto(e.target.value)} value="telefono"/>
                        </div>
                    </div>      
                </div>
                {contacto === "telefono" &&
                    <div className="flex flex-col md:flex-row gap-5 items-center mt-5">
                        <p className="mr-5 font-bold w-full">Indiquenos una fecha y periodo de horas en las que podemos contactarle:</p>
                        <Campo texto={"Fecha:"} tipo={"date"} clases={"w-[10rem]"} funcion={e=>setFecha(e.target.value)} valor={fecha}/>
                        <Campo texto={"Desde las:"} tipo={"time"} clases={"w-[10rem]"} funcion={e=>setDesdeHora(e.target.value)} valor={desdeHora}/>
                        <Campo texto={"Hasta las:"} tipo={"time"} clases={"w-[10rem]"} funcion={e=>setHastaHora(e.target.value)} valor={hastaHora}/>
                    </div>
                }
                
                {msg && 
                    <div>
                        <Alerta alerta={alerta}/>
                    </div>
                }
                
                <div className="flex flex-col md:flex-row justify-center items-center mt-10 gap-10">

                    <div className="border flex items-center md:w-60 w-full h-fit gap-x-3 p-5 justify-center bg-slate-800">
                        <button type="button" className="uppercase font-semibold cursor-pointer" onClick={()=>limpiarForm()}>Limpiar</button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </div>

                    <div className="flex items-center justify-center px-5 border w-full md:w-60 bg-lime-700">
                        <Boton texto={"Enviar mensaje"} clases={""} form={true} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                        </svg>
                    </div>

                </div>
            </form>
        </div>
    </>
  )
}

export default Contacto
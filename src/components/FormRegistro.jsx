import Campo from "./Campo";
import Boton from "./Boton";
import { useCallback, useState } from "react";
import Alerta from "./Alerta"
import useAgentes from "../hooks/useAgentes"
import Ping from "./Ping";
import { useDropzone } from "react-dropzone";

const FormLoginRegistro = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [domicilio, setDomicilio] = useState("");
    const [telefono, setTelefono] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [alerta, setAlerta] = useState({})
    const {registrarse} = useAgentes()
    const ubicacion = "-top-[50px] left-[18rem] md:left-[28rem] sm:left-[32rem] lg:left-[31rem]";

    const onDrop = useCallback((acceptedFiles)=>{
        console.log(acceptedFiles)
    }, []);
    
    const {getRootProps, getInputProps, acceptedFiles} = useDropzone({onDrop})

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(!nombre || !apellido || !domicilio || !telefono || !email || !password || !fechaNacimiento){
            setAlerta({msg:"Debe completar todos los campos", error:true})
            setTimeout(() => {
                setAlerta({})
            }, 3000); 
            return
        }

        if(password.length < 8){
            setAlerta({msg:"Contraseña debe tener un minimo de 8 caracteres", error:true})
            setTimeout(() => {
                setAlerta({})
            }, 3000); 
            return
        }

        registrarse({nombre, apellido, domicilio, telefono, email, password, fechaNacimiento}, acceptedFiles);
        setAlerta({msg:"Cuenta creada con exito", error:false})
        
        setTimeout(() => {
            limpiarForm();
            setAlerta({})
        }, 3000); 

    }

    const limpiarForm = () =>{

        setEmail("")
        setPassword("")
        setDomicilio("")
        setTelefono("")
        setFechaNacimiento("")
        setNombre("")
        setApellido("")
        setAlerta({})
    }

    const {msg} = alerta;

  return (
    <>   
        <div className={`flex flex-col justify-center items-center col-span-2 md:col-span-1 md:col-start-2`}>
            <h1 className="text-center text-2xl my-5">Complete el formulario para crear su cuenta</h1>

            <form action="" className="w-full" onSubmit={handleSubmit} encType="multipart/form-data">

                <div className="h-[21rem] overflow-auto px-5">

                    <Campo texto={"Nombre:"} tipo={"texto"} placeholder={"Ingrese su nombre"} valor={nombre} funcion={e=>{setNombre(e.target.value)}}/>

                    <Ping ubicacion={ubicacion} input={nombre} />

                    <Campo texto={"Apellido:"} tipo={"texto"} placeholder={"Ingrese su apellido"} valor={apellido} funcion={e=>{setApellido(e.target.value)}}/>

                    <Ping ubicacion={ubicacion} input={apellido} />

                    <Campo texto={"Telefono:"} tipo={"tel"} placeholder={"Ingrese su telefono"} valor={telefono} funcion={e=>{setTelefono(e.target.value)}}/>

                    <Ping ubicacion={ubicacion} input={telefono} />

                    <Campo texto={"Fecha de nacimiento:"} tipo={"date"} placeholder={"Ingrese su fecha de nacimiento"} valor={fechaNacimiento}
                    funcion={e=>{setFechaNacimiento(e.target.value)}}/>

                    <Ping ubicacion={"-top-[50px] left-[16rem] md:left-[12rem] sm:left-[30rem] lg:left-[30rem]"} input={fechaNacimiento} />

                    <Campo texto={"Domicilio:"} tipo={"text"} placeholder={"Ingrese su domicilio"} valor={domicilio} funcion={e=>{setDomicilio(e.target.value)}}/>

                    <Ping ubicacion={ubicacion} input={domicilio} />

                    <Campo texto={"Email:"} tipo={"email"} placeholder={"Ingrese su email"} valor={email} funcion={e=>{setEmail(e.target.value)}} />

                    <Ping ubicacion={ubicacion} input={email} />

                    <Campo texto={"Password:"} tipo={"password"} placeholder={"Ingrese su password"} valor={password} funcion={e=>{setPassword(e.target.value)}}/>

                    <Ping ubicacion={ubicacion} input={password} />

                </div>

                <div className="flex my-10 justify-center gap-x-10">
                    <div {...getRootProps()} className="border p-5 bg-yellow-600 font-bold">
                        <input type="file" name="foto" {...getInputProps()}/>
                        <div className="flex justify-center md:gap-x-3 items-center">
                            <p className="cursor-pointer uppercase">Subir foto de perfil</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12 md:size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                            </svg>
                        </div> 
                    </div>
                    <div className="border flex items-center md:w-52 p-5 gap-x-3 justify-center bg-slate-800 md:h-fit">
                        <button type="button" className="uppercase font-semibold cursor-pointer" onClick={()=>limpiarForm()}>Limpiar</button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </div>
                </div>

                <div className="my-5 flex gap-y-5 flex-col md:flex-row justify-around">
                    <div className="flex items-center md:w-60 gap-x-2 justify-center border bg-lime-600">
                        <Boton texto={"Registrarme"} clases={""} form={true}/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
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

        <div className={`col-start-1 row-start-1 col-span-1 hidden md:flex`}>
            <img src="../img/blog3.jpg" alt="" className="w-5/6 h-fit rounded-md mx-auto"/> 
        </div>
    </>
  )
}

export default FormLoginRegistro;
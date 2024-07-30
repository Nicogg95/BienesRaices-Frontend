import { useCallback, useState } from "react";
import useAgente from "../hooks/useAgentes"
import Alerta from "./Alerta";
import Boton from "./Boton";
import { useDropzone } from "react-dropzone";

const Perfil = () => {

  const { agente, editarPerfil } = useAgente()
  const [editar, setEditar] = useState(false);
  const {nombre, telefono, email, apellido, domicilio, fechaNacimiento, _id, foto} = agente;
  const [inputEmail, setInputEmail] = useState(email)
  const [inputTelefono, setInputTelefono] = useState(telefono)
  const [inputDomicilio, setInputDomicilio] = useState(domicilio)
  const [alerta, setAlerta] = useState({});

  const onDrop = useCallback((acceptedFiles)=>{
    console.log(acceptedFiles)
  }, []);

  const {getRootProps, getInputProps, acceptedFiles} = useDropzone({onDrop})

  const formatearFecha = (fecha) =>{
    const nuevaFecha = new Date(fecha.split('T')[0].split('-'));
    return new Intl.DateTimeFormat("es-AR", {dateStyle: "long"}).format(nuevaFecha);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(!inputEmail || !inputDomicilio || !inputTelefono){
      setAlerta({msg: "Debe completar todos los campos", error:true});
      setTimeout(() => {
        setAlerta({})
      }, 3000);
      return
    }

    const email = inputEmail;
    const domicilio = inputDomicilio;
    const telefono = inputTelefono;

    editarPerfil({email, domicilio, telefono, _id}, acceptedFiles);
    setAlerta({msg: "Datos Actualizados", error: false});
    setTimeout(() => {
      setAlerta({})
    }, 3000);
    setEditar(false)
  }

  const handleClick = () =>{
    setEditar(!editar);
  }

  const {msg} = alerta;

  return (
    <>
      <h2 className="text-center text-2xl font-bold md:col-span-6 col-span-9 mb-10">En este sector podras ver y editar sus datos</h2>
      <div className="col-span-9 md:col-span-3 flex items-center">
        <img src={`https://res.cloudinary.com/dporcnhrk/image/upload/v1721716911/${foto}.jpg`} alt="foto de perfil" className="w-9/12 md:w-5/12 min-h-fit mb-8 mx-auto rounded-3xl"/>
      </div>
      <div className="col-span-9 md:col-span-3 md:col-start-4 md:w-10/12">
        <div className="grid justify-center gap-x-10">
          <h3 className="my-10 text-2xl font-bold row-start-1">{nombre} {apellido}</h3>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="row-start-1 size-8 my-auto mx-auto cursor-pointer" onClick={handleClick}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </div>

        <form action="" onSubmit={handleSubmit} className="mx-5">

          <div className="grid grid-cols-6 gap-x-5 items-center my-3">
            <label htmlFor="" className="col-span-2 text-start">Telefono:</label>
            <input type="text" value={inputTelefono} onChange={e=>setInputTelefono(e.target.value)} disabled={editar? false:true}
            className={`p-3 col-span-4 bg-black rounded-xl border ${editar? "shadow-md shadow-white":""}`} />
          </div>
          
          <div className="grid grid-cols-6 gap-x-5 items-center my-3">
          <label htmlFor="" className="col-span-2 text-start">Email:</label>
            <input type="text" value={inputEmail} onChange={e=>setInputEmail(e.target.value)} disabled={editar? false:true}
            className={`p-3 col-span-4 bg-black rounded-xl border ${editar? "shadow-md shadow-white":""}`} />
          </div>

          <div className="grid grid-cols-6 gap-x-5 items-center my-3">
          <label htmlFor="" className="col-span-2 text-start">Domicilio:</label>
            <input type="text" value={inputDomicilio} onChange={e=>setInputDomicilio(e.target.value)} disabled={editar? false:true}
            className={`p-3 col-span-4 bg-black rounded-xl border ${editar? "shadow-md shadow-white":""}`} />
          </div>

          <div className="grid grid-cols-6 gap-x-5 items-center my-3">
          <label htmlFor="" className="col-span-2 text-start">Fecha de nacimiento:</label>
            <input type="text" value={fechaNacimiento? formatearFecha(fechaNacimiento) : ""} disabled
            className={`p-3 col-span-4 bg-black rounded-xl border`} />
          </div>

          {editar &&
          (<>
            <div className="flex justify-center mt-14 bg-lime-600 border items-center w-full">
                <Boton texto={"Actualizar datos"} form={true}/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
            <div className="my-5 border p-5 md:w-fit mx-auto bg-yellow-600 font-bold md:absolute md:left-[15rem] md:top-[52rem] w-full">
              <div {...getRootProps()}>
                <input type="file" {...getInputProps()}/>
                <div className="flex justify-center gap-x-3 items-center">
                  <p className="cursor-pointer uppercase">Cambiar foto de perfil</p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                  </svg>
                </div>
              </div>
            </div>
          </>)}

        </form>
      </div>

      <div className="my-5 flex flex-col items-center col-span-9 md:col-span-6 gap-y-5">
        {msg && <Alerta alerta={alerta}/>}
      </div>   
    </>
  )
}

export default Perfil
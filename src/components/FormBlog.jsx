import { useCallback, useEffect, useState } from "react";
import Campo from "./Campo";
import { useDropzone } from "react-dropzone";
import Alerta from "./Alerta";
import useBlog from "../hooks/useBlog";
import useAgentes from "../hooks/useAgentes";


const FormBlog = () => {

    const [titulo, setTitulo] = useState("");
    const [resumen, setResumen] = useState("");
    const [contenido, setContenido] = useState("");
    const [alerta, setAlerta] = useState({})
    const [id, setId] = useState(null)
    const {crear, publicacion} = useBlog()
    const {agente} = useAgentes()
    const {nombre, apellido} = agente;
    const autor = `${nombre} ${apellido}`;

    useEffect(()=>{
        if(publicacion?.titulo){
            setContenido(publicacion.contenido);
            setResumen(publicacion.resumen);
            setTitulo(publicacion.titulo);
            setContenido(publicacion.contenido);
            setId(publicacion._id);
        }
    }, [publicacion])

    const onDrop = useCallback((acceptedFiles)=>{
        console.log(acceptedFiles)
    }, []);
    
    const {getRootProps, getInputProps, acceptedFiles} = useDropzone({onDrop})

    const handleSubmit = (e)=>{
        e.preventDefault();
        
        if(!titulo || !contenido || !resumen){
            setAlerta({msg: "Debe completar todos los campos", error: true})
            setTimeout(() => {
                setAlerta({})
            }, 3000);
            return;
        }

        crear({titulo, resumen, contenido, autor, id}, acceptedFiles);
        setAlerta({msg: `${id? "Actualizado con exito!" : "Creado con exito!"}`, error: false});
        limpiarForm();
        setTimeout(() => {
            setAlerta({})
        }, 3000);

    }

    const limpiarForm = () =>{
        setContenido("");
        setTitulo("");
        setResumen("");
        setId(null)
    }

    const {msg} = alerta;


  return (
    <>
        <div className="container">
            <form action="" onSubmit={handleSubmit} className="md:w-11/12 mx-auto" encType="multipart/form-data">
                <Campo texto={"Titulo:"} funcion={e=>setTitulo(e.target.value)} nombre={"titulo"} valor={titulo}/>
                <div className="flex flex-col gap-y-3 mb-5">
                    <label className="font-bold">Resumen:</label>
                    <textarea type="text" value={resumen} onChange={e=>setResumen(e.target.value)} className="p-3 bg-black border solid border-gray-700 hover:border-white rounded-lg" rows="3" name="resumen" id="resumen"/>
                </div>
                <div className="flex flex-col gap-y-3 mb-5">
                    <label className="font-bold">Contenido:</label>
                    <textarea type="text" value={contenido} onChange={e=>setContenido(e.target.value)} className="p-3 bg-black border solid border-gray-700 hover:border-white rounded-lg" rows="6" name="contenido" id="contenido"/>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center mx-auto gap-5 my-10 md:w-10/12 w-full">
                    <div {...getRootProps()} className="border p-4 md:p-3 w-full md:w-8/12 bg-yellow-600 font-bold">
                    <input type="file" {...getInputProps()}/>
                    <div className="flex justify-center gap-x-3 items-center">
                    <p className="cursor-pointer uppercase">Subir imagenes</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>
                    </div> 
                    </div>
                    <div className="border flex items-center gap-x-3 p-4 md:p-6 justify-center bg-slate-800 md:w-40 w-full">
                    <button type="button" className="uppercase font-semibold cursor-pointer" onClick={()=>limpiarForm()}>Limpiar</button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </div>
                </div>
                <div className="border flex items-center gap-x-3 p-5 justify-center bg-lime-600 font-bold">
                    <input type="submit" value={id ? "Actualizar" : "Agregar" } className="uppercase cursor-pointer"/>
                    {!id? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    ):(
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    )}
                </div>
            </form>
        </div>
        <div className="my-5">
            {msg && <Alerta alerta={alerta}/>}
        </div>
    </>
  )
}

export default FormBlog
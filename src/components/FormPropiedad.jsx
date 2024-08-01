import { useCallback, useEffect, useState } from "react"
import Campo from "./Campo"
import usePropiedades from "../hooks/usePropiedades"
import Alerta from "./Alerta"
import {useDropzone} from "react-dropzone"

const FormPropiedad = () => {

  const {guardarPropiedad, propiedad} = usePropiedades();

  const [titulo, setTitulo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [operacion, setOperacion] = useState("");
  const [id, setId] = useState(null);
  const [habitaciones, setHabitaciones] = useState("0");
  const [baños, setBaños] = useState("0");
  const [estacionamientos, setEstacionamientos] = useState("0");
  const [alerta, setAlerta] = useState({});

  useEffect(()=>{
    
    if(propiedad?.titulo){
      setTitulo(propiedad.titulo)
      setDescripcion(propiedad.descripcion)
      setDireccion(propiedad.direccion)
      setOperacion(propiedad.operacion)
      setHabitaciones(propiedad.habitaciones)
      setEstacionamientos(propiedad.estacionamientos)
      setBaños(propiedad.baños)
      setPrecio(propiedad.precio)
      setId(propiedad._id)
    }

  }, [propiedad])

  const onDrop = useCallback((acceptedFiles)=>{
    console.log(acceptedFiles)
  }, []);

  const {getRootProps, getInputProps, acceptedFiles} = useDropzone({onDrop})
  
  const handleSubmit = async(e) =>{
    e.preventDefault();

    if(!titulo || !direccion || !descripcion || !precio || !operacion){
      setAlerta({msg:"Debe completar todos los campos", error:true})
      return;
    }

    guardarPropiedad({titulo, direccion, descripcion, precio, operacion, baños, habitaciones, estacionamientos, id}, acceptedFiles)
    setAlerta({msg: "Guardado con exito", error:false})
    limpiarForm()
  }

    const limpiarForm = () =>{

      setBaños("")
      setDescripcion("")
      setDireccion("")
      setEstacionamientos("")
      setOperacion("")
      setTitulo("")
      setPrecio("")
      setHabitaciones("")
      setId(null)
      setAlerta({})
    }
    
    const {msg} = alerta;

  return (
    <>
      <div className="my-5">
        <h2 className="text-center md:w-11/12 mx-auto text-2xl font-bold mb-10 px-5">Complete el formulario para agregar una propiedad</h2>
        <form action="" onSubmit={handleSubmit} className="md:w-10/12 mx-auto px-5" encType="multipart/form-data">

          <Campo texto={"Titulo:"} 
                  valor={titulo} tipo={"text"} 
                  funcion={e=>setTitulo(e.target.value)}
                  nombre={"titulo"}/>
          
          <Campo texto={"Direccion:"} 
                  valor={direccion} tipo={"text"} 
                  funcion={e=>setDireccion(e.target.value)}
                  nombre={"direccion"}/>
          
          <div className={`flex flex-col gap-y-3 mb-5`}>
            <label htmlFor="descripcion" className="font-bold">Descripcion:</label>
            <textarea name="descripcion" id="descripcion" rows="8" cols="30"
            value={descripcion}
            onChange={e=>setDescripcion(e.target.value)}
            className="p-3 bg-black border solid border-gray-700 hover:border-white rounded-lg"></textarea>
          </div>
          
          <div className="flex justify-around">
            <div className="flex flex-col gap-y-3 mb-5 w-5/12">
              <label htmlFor="" className="font-bold">Precio:</label>
              <input type="number" id="precio" name="precio" value={precio}
                className="p-3 bg-black border solid border-gray-700 hover:border-white rounded-lg" 
                onChange={e=>setPrecio(e.target.value)} min={100} step={100} max={99999999} />
            </div>
            
            <Campo texto={"Habitaciones:"} max={"10"}
              clases={"w-5/12"} valor={habitaciones} tipo={"number"} 
              funcion={e=>setHabitaciones(e.target.value)}
              nombre={"habitaciones"}/>
          </div>
        
          <div className="flex justify-around">
            <Campo texto={"Baños:"} max={"10"}
                    clases={"w-5/12"}
                    valor={baños} tipo={"number"} 
                    funcion={e=>setBaños(e.target.value)}
                    nombre={"baños"}/>
            <Campo texto={"Estacionamientos:"} max={"10"}
                    clases={"w-5/12"}
                    valor={estacionamientos} tipo={"number"} 
                    funcion={e=>setEstacionamientos(e.target.value)}
                    nombre={"estacionamientos"}/>
          </div>

          <div className="flex justify-around items-center mt-5">
            <label htmlFor="" className="block font-bold">Tipo de operacion:</label>
            <select name="operacion" id="operacion" className="p-3 md:w-40 bg-black border solid border-gray-700 hover:border-white rounded-lg" onChange={e=>setOperacion(e.target.value)} value={operacion}>
                <option disabled selected value="">-- Seleccionar --</option>
                <option value="Venta">Venta</option>
                <option value="Alquiler">Alquiler</option>
            </select>
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

          <div className="flex justify-center mt-5">
            <div className="border flex items-center w-full gap-x-3 p-5 justify-center bg-lime-600 font-bold">
              <input type="submit" value={id ? "Actualizar" : "Agregar"} className="uppercase cursor-pointer"/>
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
          </div>
          
          <div className="my-5">
            {msg && <Alerta alerta={alerta}/>}
          </div>
          
        </form>
      </div>
    </>
  )
}

export default FormPropiedad
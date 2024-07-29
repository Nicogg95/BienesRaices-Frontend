// import { useParams } from "react-router-dom"
import useBlog from "../hooks/useBlog";
import { useEffect } from "react";
import clienteAxios from "../config/axios";
import { useParams } from "react-router-dom";
import Boton from "../components/Boton";
import useAgentes from "../hooks/useAgentes";

const Publicacion = () => {

  const params = useParams();
  const {id} = params;
  const {publicacion, setPublicacion} = useBlog();
  const {agente} = useAgentes();

  useEffect(() => {

    const obtenerPublicacion = async() =>{

      try {
        
        const {data} = await clienteAxios(`/blog/detalle/${id}`)
        setPublicacion(data);
      } catch(error) {
        console.log(error)
      }
    }

    obtenerPublicacion()
  }, [id, publicacion, setPublicacion]);

  const {titulo, contenido, imagen, fecha, autor} = publicacion;

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha.split('T')[0].split('-'))
    return new Intl.DateTimeFormat("es-AR", {dateStyle: "long"}).format(nuevaFecha);
    }


  return (
    <>  
      <div className="container mx-auto p-10 flex flex-col gap-y-10">
        <h1 className="text-center text-3xl font-bold">{titulo}</h1>
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex flex-col gap-y-10 basis-3/4">
            <p>{contenido}</p>
            <p>Escrito el <span className="text-yellow-600">{fecha? formatearFecha(fecha) : ""}</span> por <span className="text-yellow-600">{autor}</span>.</p>
          </div>
          <div className="md:w-10/12 row-start-1 basis-2/4">
            <img src={`https://res.cloudinary.com/dporcnhrk/image/upload/v1721181497/${imagen}.jpg`} alt="imagen blog"/>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-10">
          {agente.nombre && <Boton texto={"Administrar"} clases={"bg-blue-600 md:w-1/6"} href={"/admin"}/>}
          <Boton texto={"Blog"} clases={"bg-lime-600 md:w-1/6"} href={"/blog"}/>
        </div>
      </div>
    </>
  )
}

export default Publicacion
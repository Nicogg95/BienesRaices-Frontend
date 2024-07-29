import { Link, useParams } from "react-router-dom";
import useBlog from "../hooks/useBlog"
import { useEffect } from "react";
import clienteAxios from "../config/axios";

const VerBlog = () => {

  const { publicacion, setPublicacion } = useBlog();

  const {id} = useParams();

  useEffect(()=>{

    const obtenerPublicacion = async() =>{

      try {
      
        const {data} = await clienteAxios(`/blog/${id}`);
        
        setPublicacion(data);
  
      } catch(error){
        console.log(error);
      }
    }

    obtenerPublicacion(id)

  }, [publicacion, id, setPublicacion])
  
  const {titulo, contenido, imagen, autor, fecha} = publicacion;

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha)
    return new Intl.DateTimeFormat("es-AR", {dateStyle: "long"}).format(nuevaFecha);

  }

  return (
    <>
      <div className="container p-10 min-h-fit">
        <Link to={`http://localhost:5173/blog/${id}`}>
          <h1 className="text-2xl text-center font-bold">{titulo}</h1>
        </Link>
        <div className="grid md:grid-cols-2 my-10 gap-y-10">
          <img src={`https://res.cloudinary.com/dporcnhrk/image/upload/v1721793764/${imagen}.jpg`} alt="" className="md:w-4/6 mx-auto rounded-ss rounded-ee-lg" />

          <div className="flex gap-y-10 md:justify-around flex-col">
          
          <p className="text-xl">{contenido}</p>
          <p className="text-end">Escrito el: <span className="text-yellow-600">{formatearFecha(fecha)}</span> por: <span className="text-yellow-600">{autor}</span></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default VerBlog
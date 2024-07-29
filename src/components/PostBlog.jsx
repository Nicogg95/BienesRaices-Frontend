/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import useBlog from "../hooks/useBlog";
import Swal from "sweetalert2";

const PostBlog = ({publicacion, admin}) => {

  const {eliminarPublicacion, setEdicion} = useBlog();
  const {titulo, resumen, imagen, fecha, autor, _id} = publicacion;
  
  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha)
    return new Intl.DateTimeFormat("es-AR", {dateStyle: "long"}).format(nuevaFecha);
  }

  const btnEliminar = () =>{
    Swal.fire({
      title: "Desea eliminar esta propiedad?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, seguro"
    }).then(async(result) => {
      if (result.isConfirmed) {
        
        try{

        const {data} = await eliminarPublicacion(_id);

        Swal.fire({
            title: "Eliminado!",
            text: data,
            icon: "success"
        });

        }catch(error){

          console.log(error);
        }
      }
    })
  }

  return (
    <>
      <article className="flex flex-col md:flex-row gap-5 my-1 items-center justify-between">
      <img src={`https://res.cloudinary.com/dporcnhrk/image/upload/v1721793764/${imagen}.jpg`} alt="imagen-blog" className="w-full md:w-64 rounded-2xl"/>
        <div className="flex flex-col items-center md:items-start md:justify-around gap-y-5 w-full">
          <Link to={`/publicacion/${_id}`}>
          <h3 className="text-xl after:content-[''] after:bg-lime-500 after:h-1 after:w-60 after:block after:mt-4">{titulo}
          </h3>
          </Link>
          <p>Escrito el: <span className="text-yellow-600">{formatearFecha(fecha)}</span> por: <span className="text-yellow-600">{autor}</span></p>
          <p>{resumen}</p>
        </div>
        {admin && (
          <div className="flex md:flex-col md:justify-around h-full md:mr-5 gap-x-5">
            <button className="p-3 uppercase bg-red-600 hover:bg-red-700 rounded-full" onClick={()=>btnEliminar()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </button>
            <button className="bg-blue-600 p-3 uppercase hover:bg-blue-700 rounded-full"  onClick={()=>setEdicion(publicacion)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
             </button>
          </div>
        )}
      </article> 
    </>
  )
}

export default PostBlog
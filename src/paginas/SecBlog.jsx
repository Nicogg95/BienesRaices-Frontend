import { useEffect, useState } from "react"
import Boton from "../components/Boton"
import FormBlog from "../components/FormBlog"
import PostBlog from "../components/PostBlog"
import useBlog from "../hooks/useBlog"

const Blog = () => {

  const [movil, setMovil] = useState(false);
  const [mostrarForm, setMostrarForm] = useState(true)
  const {blog} = useBlog();
  const pantalla = window.innerWidth;
  const publicaciones = blog.data;

  useEffect(()=>{
    if(pantalla < 600){
      setMovil(true);
      setMostrarForm(false);
    }
  }, [movil, pantalla])

  const handleClickForm = () => {
    setMostrarForm(!mostrarForm)
  }

  return (
    <>
      <div className="container mx-auto p-5 grid md:grid-cols-6 gap-y-10 md:gap-x-10 bg-zinc-800 rounded-xl">
        <div className="md:col-span-4">
          <h2 className="text-center text-2xl font-bold col-span-6 mb-10">{!publicaciones?.lenght ? "Posteos del blog" : "Comienza a formar tu blog con el formulario"}</h2>
          <div className=" flex flex-col gap-y-5 overflow-auto h-[45rem]">
          {publicaciones?.map(publicacion =>(
            <PostBlog key={publicacion._id} publicacion={publicacion} admin={true}/>
          ))} 
          </div>
        </div>
        <div className="md:col-span-2 md:col-start-5">
          <div className="flex flex-col justify-center items-center md:col-span-2 w-full py-8">
          {movil && 
            <Boton texto={!mostrarForm? "Agregar publicacion": "Ocultar Formulario"} 
                  clases={"bg-lime-600"} 
                  funcion={()=>handleClickForm()}/>
          }
          </div>
          {mostrarForm &&
            (<div>
            <h2 className="text-center text-2xl font-bold col-span-6 mb-10">Complete el formulario para crear un nuevo posteo</h2>
            <FormBlog />
            </div>)}
        </div>
      </div>  
    </>
  )
}

export default Blog
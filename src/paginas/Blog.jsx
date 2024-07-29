import Boton from "../components/Boton";
import PostBlog from "../components/PostBlog";
import useAgentes from "../hooks/useAgentes";
import useBlog from "../hooks/useBlog"

const Blog = () => {

    const {blog} = useBlog();
    const {agente} = useAgentes();

    const publicaciones = blog.data;

  return (
    <div className='container p-10 mx-auto'>

        <h1 className="text-center text-3xl uppercase mb-10 mt-5 font-bold">Bienvenido a nuestro blog!</h1>
            
        <div className="flex gap-10 flex-wrap">
            
            {publicaciones?.map(publicacion =>(
                <PostBlog key={publicacion._id} publicacion={publicacion}/>
            ))} 
         
        </div>

        <div className="flex flex-col md:flex-row gap-5 justify-center my-5">
          {agente.nombre &&
            <Boton texto={"Administrar"} href="/admin" clases={"bg-blue-600 md:w-[10rem]"}/>
          }
            <Boton texto={"Inicio"} href="/" clases={"bg-yellow-600 md:w-[10rem]"} />
        </div>

    </div>
  )
}

export default Blog
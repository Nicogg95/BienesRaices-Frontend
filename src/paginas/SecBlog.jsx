import FormBlog from "../components/FormBlog"
import PostBlog from "../components/PostBlog"
import useBlog from "../hooks/useBlog"

const Blog = () => {

  const {blog} = useBlog();

  const publicaciones = blog.data;

  const admin = true;

  return (
    <>
      <div className="container mx-auto p-10 grid md:grid-cols-6 gap-y-10 md:gap-x-10 bg-zinc-800 rounded-xl">
        <div className="md:col-span-4">
          <h2 className="text-center text-2xl font-bold col-span-6 mb-10">{!publicaciones?.lenght ? "Posteos del blog" : "Comienza a formar tu blog con el formulario"}</h2>
          <div className=" flex flex-col gap-y-5 overflow-auto h-[42rem]">
          {publicaciones?.map(publicacion =>(
            <PostBlog key={publicacion._id} publicacion={publicacion} admin={true}/>
          ))} 
          </div>
        </div>
        <div className="md:col-span-2 md:col-start-5">
          <h2 className="text-center text-2xl font-bold col-span-6 mb-10">Complete el formulario para crear un nuevo posteo</h2>
          <FormBlog />
        </div>
      </div>  
    </>
  )
}

export default Blog
import PosTest from "./PosTest"
import PostBlog from "./PostBlog"
import useBlog from "../hooks/useBlog"

const SecBlogTest = () => {

  const {blog} = useBlog();

  const publicaciones = blog.data;

  return (
    <>
      <div className="px-10 mx-auto grid md:grid-cols-2 my-10 gap-10">
          <div className="flex flex-col gap-y-5">
            <h2 className='text-center text-3xl'>Nuestro Blog</h2>
            {publicaciones? 
            <>
              {publicaciones?.map(publicacion =>(
              <PostBlog key={publicacion._id} publicacion={publicacion}/>
              ))}
            </>:<>
              <div className="flex items-center text-center my-10 md:mt-60"> 
                <img src="img\cargando.webp" className="w-[5rem] m-auto"/>
              </div>
            </>}
          </div>

          <div className="flex flex-col gap-y-10">
            <h2 className='text-center text-3xl'>Testimonios</h2>
            <PosTest />
            <PosTest />
            <PosTest />
          </div>
      </div>
    </>
  )
}

export default SecBlogTest
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";

const BlogContext = createContext()

export const BlogProvider = ({children}) =>{

    const [publicacion, setPublicacion] = useState({});
    const [blog, setBlog] = useState([]);

    useEffect(()=>{
        const obtenerBlogs = async() =>{

            try{
                const data = await clienteAxios("/blog/verBlog");
                setBlog(data);
            }catch(error){
                console.log(error);
            }
        }
        obtenerBlogs();
    }, [blog]);

    const crear = async(publicacion, foto) =>{

        const token = localStorage.getItem("token");

        const config = {
            headers: {
                "Content-Type": `${!foto.includes("") ? "multipart/form-data" : "application/json"}`,
                Authorization : `Bearer ${token}`
            }
        }

        publicacion.imagen = foto;

        if(publicacion.id){

            try{
                const {data} = await clienteAxios.put(`/blog/editar/${publicacion.id}`, publicacion, config);
                const actualizado = blog.map(elemento => elemento._id === data._id ? data : elemento)
                setBlog(actualizado);

            }catch(error){
                console.log(error)
            }

        } else {

            try{
                const {data} = await clienteAxios.post("/blog/", publicacion, config);

                setBlog([data, ...blog])
             
            }catch(error){
                console.log(error)
            }
        }
        
    }

    const eliminarPublicacion = async(id) =>{

        const token = localStorage.getItem("token");

        if(!token) return;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try{

            const {data} = await clienteAxios.delete(`/blog/eliminar/${id}`, config);
            console.log(data)

        }catch(error){
            console.log(error)
        }

    }

    const setEdicion = (publicacion) =>{
        setPublicacion(publicacion)
    }
   
    return (
        <BlogContext.Provider 
        value={{
            crear, blog, publicacion, setEdicion,
            setPublicacion, eliminarPublicacion
            }}>{children}
        </BlogContext.Provider>
    )

}

export default BlogContext;
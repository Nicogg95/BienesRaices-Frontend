/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom"
import Boton from "../components/Boton"
import clienteAxios from "../config/axios"
import { useEffect } from "react"
import usePropiedades from "../hooks/usePropiedades"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import useAgentes from "../hooks/useAgentes"

const Propiedad = () => {

  const params = useParams()
  const {id} = params;
  const {setPropiedad, propiedad} = usePropiedades()
  const {agente} = useAgentes();

  useEffect(()=>{
    
    const verPropiedad = async() =>{

      try {
        
        const{data} = await clienteAxios(`/propiedades/detalle/${id}`)
        setPropiedad(data)

      }catch(error){
        console.log(error);
      }
  
    }
    verPropiedad();

  }, [propiedad])

  const {titulo, descripcion, precio, habitaciones, estacionamientos, baños, operacion, direccion, imagen} = propiedad;

  let imagenes = [];

  imagen?.map(e => {
    const url = {
      "original": `https://res.cloudinary.com/dporcnhrk/image/upload/v1721181497/${e}.jpg`,
      "thumbnail": `https://res.cloudinary.com/dporcnhrk/image/upload/v1721181497/${e}.jpg`
    }  

    return imagenes.push(url)
  });

  return (
    <>
      <div className="container mx-auto p-10">
   
        <div className="grid md:grid-cols-2 gap-x-10 items-center">

          <div className="w-12/12 md:w-11/12 my-10">
              <ImageGallery items={imagenes} autoPlay={false} showPlayButton={false}/>
          </div>
  
          <div className="flex flex-col gap-y-5">
            <h1 className="text-center text-3xl font-bold">{titulo}</h1>
            <p className="text-xl">{descripcion}</p>
            <p><span className="font-bold">Precio: </span>${precio}</p>
            <p><span className="font-bold">Tipo de operacion: </span>{operacion}</p>
            <p><span className="font-bold">Direccion: </span>{direccion}</p>
            
            <div className="flex justify-around items-center my-5">
              <img src="../img/icono_wc.svg" alt="icono baño" className="invert w-[35px]"/>
              <p>{baños}</p>
              <img src="../img/icono_dormitorio.svg" alt="icono habitacion" className="invert w-10"/>
              <p>{habitaciones}</p>
              <img src="../img/icono_estacionamiento.svg" alt="icono estacionamiento" className="invert w-10"/>
              <p>{estacionamientos}</p>
            </div>
            
            <div className="flex flex-col md:flex-row my-5 justify-center gap-10">
              <Boton texto={"Catalogo"} href="/catalogo" clases={"bg-lime-600 w-full"}/>

              {agente.nombre &&
                <Boton texto={"Administrar"} href="/admin" clases={"bg-blue-600 w-full"}/>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Propiedad
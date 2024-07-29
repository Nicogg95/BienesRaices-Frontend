/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Swal from 'sweetalert2'
import usePropiedades from "../hooks/usePropiedades";
import Boton from "./Boton"

const Anuncio = ({propiedad, admin}) => {

  // ------ Variables ------

  const {titulo, _id, descripcion, precio, operacion, baños, estacionamientos, habitaciones, direccion, imagen} = propiedad;
  const {setEdicion, eliminarPropiedad} = usePropiedades()

  // ------ Funciones ------

  const btnEliminar = () =>{

    Swal.fire({
      title: "Desea eliminar esta propiedad?",
      icon: "warning",
      showCancelButton: true,
      background: "#383838",
      color: "#fff",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, seguro"
    }).then(async(result) => {
      if (result.isConfirmed) {

        try{

          const {data} = await eliminarPropiedad(_id);

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
      {admin ? 
      (<> {/* ------ Anuncio para la seccion Admin ------ */}

        <div className="border border-gray-300 rounded-md flex flex-col justify-between my-5 md:my-1">
          <img src={`https://res.cloudinary.com/dporcnhrk/image/upload/v1721198841/${imagen[0]}.jpg`} alt="foto propiedad" className="w-fit border-gray-300 border rounded-t-md"/>
          <h3 className="text-center text-2xl pb-3 my-5 border-b-2 w-10/12 mx-auto">{titulo}</h3>
          <div className={`flex flex-col gap-y-2 px-5 h-fit md:min-h-[185px]`}>  
            <p>{descripcion}</p>
            <p><span className="font-bold">Precio: </span> ${precio}</p>
            <p><span className="font-bold">Operacion: </span> {operacion}</p>
            <p><span className="font-bold">Direccion: </span> {direccion}</p>
          </div>
          <div className="flex justify-around px-5 items-center mt-5">
            <img src="../img/icono_wc.svg" alt="icono baño" className="invert md:w-[35px]"/>
            <p>{baños}</p>
            <img src="../img/icono_dormitorio.svg" alt="icono habitacion" className="invert md:w-10"/>
            <p>{habitaciones}</p>
            <img src="../img/icono_estacionamiento.svg" alt="icono estacionamiento" className="invert md:w-10"/>
            <p>{estacionamientos}</p>
          </div>  
          <div className="grid grid-cols-3 mt-5 justify-center">
            <button className="col-span-1 py-3 uppercase bg-red-600 hover:bg-red-700 border rounded-bl-md font-bold" onClick={()=>btnEliminar()}>Eliminar</button>
            <button className="col-span-1 py-3 bg-blue-600 uppercase hover:bg-blue-700 border font-bold"  onClick={()=>setEdicion(propiedad)}>Editar</button>
            <Boton clases="col-span-1 py-3 bg-lime-600 hover:bg-lime-700 border rounded-br-md font-bold" href={`/propiedad/${_id}`} texto={"Ver"}/>
          </div> 
        </div>
      </>)
      : 
      (<> 
      
        {/* ------ Anuncio para la seccion Inicio ------ */}

        <div className="flex flex-col gap-y-5 items-center min-w-[18rem] min-h-fit rounded-t-md border border-gray-300 hover:shadow-white hover:shadow-lg">
          <img src={`https://res.cloudinary.com/dporcnhrk/image/upload/v1721198841/${imagen[0]}.jpg`} alt="foto propiedad" className="w-full border-b rounded-t-md border-gray-300"/>
          <h3 className="text-center text-2xl">{titulo}</h3>
          <div className="flex flex-col gap-y-5 px-5">
              <p className="text-center h-[80px] mb-5">{descripcion}</p>
              <p className="font-bold text-lime-600 text-xl text-center mt-10 mb-5">$ {precio}</p>
              <div className="flex justify-center gap-x-4 items-center mb-5">
                <img src="../img/icono_wc.svg" alt="icono baño" className="invert w-[35px]"/>
                <p>{baños}</p>
                <img src="../img/icono_dormitorio.svg" alt="icono habitacion" className="invert w-10"/>
                <p>{habitaciones}</p>
                <img src="../img/icono_estacionamiento.svg" alt="icono estacionamiento" className="invert w-10"/>
                <p>{estacionamientos}</p>
              </div>  
          </div>
          <Boton texto={"Ver propiedad"} clases={"bg-lime-600 w-full"} href={`/propiedad/${_id}`}/>
        </div>
      </>)}
    </>
  )
}

export default Anuncio;
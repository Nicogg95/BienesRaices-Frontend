import { useState } from "react";
import usePropiedades from "../hooks/usePropiedades";

const ModalFiltro = () => {

    const [precio, setPrecio] = useState(50000);
    const [edificio, setEdificio] = useState("");
    const [operacion, setOperacion] = useState("");
    const [baños, setBaños] = useState(10);
    const [estacionamientos, setEstacionamientos] = useState(10);
    const [habitaciones, setHabitaciones] = useState(10);
    const {setMostrarModal, filtrarPropiedades} = usePropiedades();

    const handleSubmit = (e) =>{
        e.preventDefault();

        filtrarPropiedades({operacion, estacionamientos, baños, habitaciones, edificio, precio});
        setMostrarModal(false);
    }

    const toggle = () =>{
        setMostrarModal(false)
        limpiarForm();
    }

    const limpiarForm = () =>{

        setOperacion("");
        setEdificio("");
        setPrecio("");
        setBaños("");
        setHabitaciones("");
        setEstacionamientos("");
    }

  return (
    <> 
        <div className="bg-black fixed z-10 top-0 bottom-0 left-0 right-0 bg-opacity-50 h-fit">
            <form className='bg-black rounded border border-white w-10/12 md:w-[32rem] p-10 mx-auto z-20' onSubmit={handleSubmit}>
                
                <div className="flex justify-between">

                    <p className="text-2xl md:mb-10 md:mx-auto">Filtro de busqueda</p>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10 cursor-pointer" onClick={toggle}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                </div>

                <div className="my-5 flex flex-col md:flex-row justify-between items-center md:gap-5">
                    <label htmlFor="">Precio</label>
                    <input type="range" min="0" max="100000" step={5000} className="p-3 w-full bg-black border rounded-lg text-white" value={precio}
                    onChange={e=>setPrecio(e.target.value)}/>
                    <p>{precio}</p>
                </div>

                <div className="my-5 flex flex-row justify-between items-center gap-5">
                    <label htmlFor="">Tipo de edificio:</label>
                    <select type="text" className="p-3 bg-black border rounded-lg w-fit text-center" value={edificio}
                    onChange={e=>setEdificio(e.target.value)}>
                        <option value="" disabled selected>-- Seleccionar --</option>
                        <option value="Casa">Casa</option>
                        <option value="Departamento">Departamento</option>
                    </select>
                </div>

                <div className="my-5 flex flex-row justify-between items-center gap-5">
                    <label htmlFor="">Tipo de operacion:</label>
                    <select type="text" className="p-3 bg-black border rounded-lg w-fit text-center" value={operacion}
                    onChange={e=>setOperacion(e.target.value)}>
                        <option value="" disabled selected>-- Seleccionar --</option>
                        <option value="Venta">Venta</option>
                        <option value="Alquiler">Alquiler</option>
                    </select>
                </div>

                <div className="my-5 flex flex-row justify-between items-center gap-5">
                    <label htmlFor="">Cantidad de baños:</label>
                    <input type="number" min={1} max={10} className="p-3 bg-black border rounded-lg w-fit md:-4/12 text-center" value={baños}
                    onChange={e=>setBaños(e.target.value)}/>
                </div>

                <div className="my-5 flex flex-row justify-between items-center gap-5">
                    <label htmlFor="">Cantidad de habitaciones:</label>
                    <input type="number" min={1} max={10} className="p-3 bg-black border rounded-lg w-fit md:-4/12 text-center" value={habitaciones}
                    onChange={e=>setHabitaciones(e.target.value)}/>
                </div>

                <div className="my-5 flex flex-row justify-between items-center gap-5">
                    <label htmlFor="">Cantidad de estacionamientos:</label>
                    <input type="number" min={1} max={10} className="p-3 bg-black border rounded-lg w-fit md:-4/12 text-center" value={estacionamientos}
                    onChange={e=>setEstacionamientos(e.target.value)}/>
                </div>
                <div className="w-fit mx-auto mt-1">
                    <button type="submit" className="text-center font-bold text-xl">FILTRAR</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default ModalFiltro;
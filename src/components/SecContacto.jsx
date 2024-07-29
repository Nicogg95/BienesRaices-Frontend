import Boton from "./Boton"

const SecContacto = () => {
  return (
    <>
        <div className="bg-[url('../img/encuentra.jpg')] bg-cover bg-center">
            <div className="container px-10 m-auto flex flex-col items-center justify-center gap-y-10 h-[25rem]">
            <h2 className='text-center text-3xl'>Encuentra la casa de tus sueños</h2>
                <p className="text-xl">LLena el formulario de contacto y un asesor se pondra en contacto contigo a la brevedad</p>
                <Boton texto={"contactanos"} clases={"w-80 bg-yellow-600"} href={"/contacto"}/>
            </div>
        </div>
    </>
  )
}

export default SecContacto
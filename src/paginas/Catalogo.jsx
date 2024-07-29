import Boton from "../components/Boton"
import SecAnuncios from "../components/SecAnuncios"
import useAgentes from "../hooks/useAgentes"

const Catalogo = () => {

  const {agente} = useAgentes()

  return (
    <>
      <h1 className="text-center text-3xl uppercase mt-10 mb-5 font-bold">Bienvenido a nuestro catalogo!</h1>
      <div className="mx-auto md:p-10 flex flex-wrap gap-10">
        <SecAnuncios catalogo={true}/>
        <div className="flex flex-col md:flex-row gap-6 justify-center w-full m-5">
          {agente.nombre &&
            <Boton texto={"Administrar"} href="/admin" clases={"bg-blue-600 md:w-[10rem]"}/>
          }
            <Boton texto={"Inicio"} href="/" clases={"bg-yellow-600 md:w-[10rem]"} />
        </div>
      </div>
    </>
   
  )
}

export default Catalogo
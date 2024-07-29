import Boton from "../components/Boton"
import SecAnuncios from "../components/SecAnuncios"
import SecBlogTest from "../components/SecBlogTest"
import SecContacto from "../components/SecContacto"
import SecNosotros from "../components/SecNosotros"

const Inicio = () => {
  return (
    <>
      <SecNosotros />
      <h2 className="text-3xl col-span-6 text-center">Nuestro Catalogo</h2>
      <SecAnuncios admin={false} cantidad={3}/>
      <div className="my-12 flex justify-center">
        <Boton texto={"Ver Catalogo completo"} href="/catalogo" clases={"bg-yellow-600"}/>
      </div>
      <SecContacto />
      <SecBlogTest />
    </>
  )
}

export default Inicio
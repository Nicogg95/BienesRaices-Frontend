import useMensaje from "../hooks/useMensaje"

const Mensajes = () => {

    const {mensajes} = useMensaje()

    return (
    <>
        <h1 className='font-bold text-center text-2xl mb-10'>Aqui podras ver todos los mensajes</h1>
        <div className="grid md:grid-cols-3 gap-5">
            {mensajes.map(mensaje => (
                <div key={mensaje._id} className="flex flex-col gap-y-5 col-span-1 border p-5">
                    <h3 className="text-xl font-bold border-b-2 text-center pb-2 border-yellow-600">{mensaje.nombre}</h3>
                    <ul>
                        <li>Telefono: {mensaje.telefono}</li>
                        <li>Email: {mensaje.email}</li>
                        <li>Precio/presupuesto: {mensaje.presupuesto}</li>
                        <li>Preferencia de contacto: {mensaje.contacto}</li>
                        {mensaje.medioContacto.fecha && <li>Fecha para contacto: {mensaje.medioContacto.fecha} / {mensaje.medioContacto.desdeHora}-{mensaje.medioContacto.hastaHora}</li>}
                    </ul>
                
                    <p>{mensaje.mensaje}</p>
                </div>
            ))}
        </div>
    </>
  )
}

export default Mensajes
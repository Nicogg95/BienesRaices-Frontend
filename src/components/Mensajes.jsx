import useMensaje from "../hooks/useMensaje"

const Mensajes = () => {

    const {mensajes} = useMensaje()

    return (
    <>
        <h1 className='font-bold text-center text-2xl mb-10'>Aqui podras ver todos los mensajes</h1>

        <table className='rounded'>
            <thead className='bg-yellow-600'>
                <th className="py-3 px-5 text-center uppercase font-bold">Nombre</th>
                <th className="py-3 px-5 text-center uppercase font-bold">Telefono</th>
                <th className="py-3 px-5 text-center uppercase font-bold">Correo</th>
                <th className="py-3 px-5 text-center uppercase font-bold">Operacion</th>
                <th className="py-3 px-5 text-center uppercase font-bold">Presupuesto/Precio</th>
                <th className="py-3 px-5 text-center uppercase font-bold">Tiempo de Contacto</th>
                <th className="py-3 px-5 text-center uppercase font-bold">Mensaje</th>
            </thead>
            <tbody className="">
                {mensajes.map(mensaje => (
                    (<tr className="py-5" key={mensaje._id}>
                        <td className="py-3 px-5 text-center bg-gray-500">{mensaje.nombre}</td>
                        <td className="py-3 px-5 text-center">{mensaje.telefono}</td>
                        <td className="py-3 px-5 text-center bg-gray-500">{mensaje.email}</td>
                        <td className="py-3 px-5 text-center">{mensaje.operacion}</td>
                        <td className="py-3 px-5 text-center bg-gray-500">{mensaje.presupuesto}</td>
                        <td className="py-3 px-5 text-center">{mensaje.medioContacto.fecha} / {mensaje.medioContacto.desdeHora} - {mensaje.medioContacto.hastaHora}</td>
                        <td className="py-7 px-5 text-center bg-gray-500 hover:h-[10rem]">{mensaje.mensaje}</td>
                    </tr>)
                ))}
            </tbody>
        </table>
    </>
  )
}

export default Mensajes
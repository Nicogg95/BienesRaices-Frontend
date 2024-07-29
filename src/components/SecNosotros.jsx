
const SecNosotros = () => {
  return (
    <div className='container mx-auto p-10 text-center'>
        <h2 className='text-center text-3xl'>Mas Sobre Nosotros</h2>
        <div className='grid md:grid-cols-3 gap-x-10 my-14'>
            <div className='flex flex-col items-center justify-between gap-y-10'>
                <img src="../img/icono1.svg" alt="" className='w-32'/>
                <h3 className='text-3xl uppercase'>Seguridad</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis odio quod mollitia placeat sint animi officiis dolorem illo ullam ipsam.</p>
            </div>
            <div className='flex flex-col items-center my-10 md:my-0 justify-between gap-y-5'>
                <img src="../img/icono2.svg" alt="" className='w-32'/>
                <h3 className='text-3xl uppercase'>Precio</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis odio quod mollitia placeat sint animi officiis dolorem illo ullam ipsam.</p>
            </div>
            <div className='flex flex-col items-center justify-between gap-y-5'>
                <img src="../img/icono3.svg" alt="" className='w-28'/>
                <h3 className='text-3xl uppercase'>A Tiempo</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis odio quod mollitia placeat sint animi officiis dolorem illo ullam ipsam.</p>
            </div>

        </div>
    </div>
  )
}

export default SecNosotros
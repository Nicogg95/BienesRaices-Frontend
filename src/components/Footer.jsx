import NavBar from "./NavBar"

const Footer = () => {

    const fecha = new Date()

    let año = fecha.getFullYear();

    return (
        <div className="min-h-[10rem] p-10 flex flex-col items-center justify-center gap-5 bg-[#292929]">
            <NavBar clase={"flex gap-x-10 md:gap-x-20"}/>
            <p>Todos los derechos reservados {año} ©</p>
        </div>
    )
}
  
export default Footer
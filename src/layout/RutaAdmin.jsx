import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import useAgentes from "../hooks/useAgentes";
import Footer from "../components/Footer"
import Cargando from "../components/Cargando";

const Layout = () => {

    const {agente, cargando} = useAgentes()
    if(cargando) return <Cargando />

  return (
    <>
      <div className="text-white bg-[#191919]">
        <Header />
        {agente?._id? (<Outlet />)
         : <Navigate to="/login"/>}
        <Footer />
      </div>
    </>
  )
}

export default Layout;
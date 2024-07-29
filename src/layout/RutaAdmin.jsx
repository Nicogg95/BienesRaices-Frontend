import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import useAgentes from "../hooks/useAgentes";
import Footer from "../components/Footer"

const Layout = () => {

    const {agente, cargando} = useAgentes()
    if(cargando) return "cargando..."

  return (
    <>
      <div className="text-white bg-[#191919]">
        <Header />
        {agente?._id? (<Outlet />)
         : <Navigate to="/"/>}
        <Footer />
      </div>
    </>
  )
}

export default Layout;
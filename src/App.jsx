import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./paginas/Login";
import Catalogo from "./paginas/Catalogo";
import Inicio from "./paginas/Inicio";
import {PropiedadesProvider} from "./context/PropiedadesProvider";
import {MensajeProvider} from "./context/MensajeProvider";
import Admin from "./paginas/Admin";
import { AgenteProvider } from "./context/AgenteProvider";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import VerPropiedad from "./paginas/VerPropiedad"
import Nosotros from "./paginas/Nosotros";
import RutaAdmin from "./layout/RutaAdmin";
import Blog from "./paginas/Blog";
import { BlogProvider } from "./context/BlogProvider";
import Contacto from "./paginas/Contacto";
import VerPublicacion from "./paginas/VerPublicacion";
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {

  return (
    <SpeedInsights>
      <BrowserRouter>
        <PropiedadesProvider>
          <MensajeProvider>
            <AgenteProvider>
              <BlogProvider>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Inicio/>}/>
                    <Route path="login" element={<Login />}/>
                    <Route path="catalogo" element={<Catalogo />}/>
                    <Route path="contacto" element={<Contacto />}/>
                    <Route path="nosotros" element={<Nosotros />}/>
                    <Route path="blog" element={<Blog />}/>
                    <Route path="publicacion/:id" element={<VerPublicacion />}/>
                    <Route path="propiedad/:id" element={<VerPropiedad />}/>
                    <Route path="confirmar/:token" element={<ConfirmarCuenta />}/>
                  </Route>
                  <Route path="/admin" element={<RutaAdmin />}>
                    <Route index element={<Admin />}/>      
                  </Route>
                </Routes>
              </BlogProvider>
            </AgenteProvider>
          </MensajeProvider>
        </PropiedadesProvider>
      </BrowserRouter>
    </SpeedInsights>
  )
}

export default App

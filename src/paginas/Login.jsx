import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAgentes from "../hooks/useAgentes";
import FormLogin from "../components/FormLogin";
import FormRegistro from "../components/FormRegistro"

const Login = () => {

  const [logIn, setLogIn] = useState(true);
  const {agente} = useAgentes();
  const navigate = useNavigate()

  useEffect(() => {
      
    if(agente?.nombre){
      navigate("/admin")
    }  

  }, [agente?.nombre, navigate]);

  const handleOnClick = () =>{

    setLogIn(!logIn)

  }

  return (
    <>
      <div className="container mx-auto p-5 flex flex-col gap-y-5 min-h-[10rem] max-h-[200rem]">
        
        <nav className="flex mx-auto gap-x-10 justify-center border w-fit rounded-xl p-5">
        
          <Link onClick={!logIn ? handleOnClick : ""}
          className={logIn ? "text-slate-500 cursor-default animate" : "animate-bounce"}>Iniciar sesion</Link>

          <Link onClick={logIn ? handleOnClick : ""}
          className={!logIn ? "text-slate-500 cursor-default" : "animate-bounce"}>Registrarse</Link>

        </nav>
        
        <div className="grid grid-cols-2 gap-x-20 h-fit items-center">
          {logIn? 
            <FormLogin />
            :
            <FormRegistro />
          }
        </div>
         
      </div>
    </>
  )
}

export default Login;
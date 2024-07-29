
const Alerta = ({alerta}) => {
  return (
    <> 
        <div className={`${alerta.error ? "bg-red-700" : "bg-lime-600"} rounded-xl border solid font-bold p-5 text-white text-center uppercase`}>
            {alerta.msg}
        </div>

    </>
  )
}

export default Alerta
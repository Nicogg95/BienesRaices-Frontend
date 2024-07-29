
const Ping = ({input, ubicacion}) => {
  return (
    <>
        <span className={`relative flex h-3 w-3 ${ubicacion}`}>
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${input ? "bg-lime-700" : "bg-red-700"} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${input ? "bg-lime-700" : "bg-red-700"}`}></span>
        </span>
    </>
   
  )
}

export default Ping
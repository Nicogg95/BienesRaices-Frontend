/* eslint-disable react/prop-types */

const Campo = ({clases, texto, placeholder, tipo, valor, funcion, max, nombre}) => {

  return (
    <>
      <div className={`flex flex-col gap-y-3 mb-5 ${clases}`}>
        <label htmlFor="" className="font-bold">{texto}</label>
        <input 
          type={tipo} 
          placeholder={placeholder} 
          name={nombre}
          id={nombre}
          className="p-3 bg-black border solid border-gray-700 hover:border-white rounded-lg" value={valor}
          onChange={funcion} min={0} max={max}/>
      </div>
    </> 
  )
}

export default Campo
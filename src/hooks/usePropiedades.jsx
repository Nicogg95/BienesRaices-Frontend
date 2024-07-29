import { useContext } from 'react'
import PropiedadesContext from '../context/PropiedadesProvider';

const usePropiedades = () => {
  return useContext(PropiedadesContext)
}

export default usePropiedades;
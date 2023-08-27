import { useState,useEffect } from "react"

const ControlPresupuesto = ({gastos,presupuesto}) => {
    const [disponible,setDisponible] = useState(0)
    const [ gastado,setGastado] = useState(0)

    useEffect(()=>{
        const totalGastado = gastos.reduce((total,gasto)=>gasto.cantidad + total,0)
        const totalDisponible = presupuesto-totalGastado

        setGastado(totalGastado)
        setDisponible(totalDisponible)
    },[gastos])

    const formatearPrecio = (precio)=>{
        return precio.toLocaleString('en-US',{
            style:'currency',
            currency:'USD'
        })
    }
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <p>Grafica aqui</p>
        </div>
        <div className='contenido-presupuesto'>
            <p>
                <span>Presupuesto: </span> {formatearPrecio(presupuesto)}
            </p>
            <p>
                <span>Disponible: </span> {formatearPrecio(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearPrecio(gastado)}
            </p>
        </div>
      
    </div>
  )
}

export default ControlPresupuesto

import { useState,useEffect } from "react"
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({gastos,presupuesto}) => {

    const [porcentaje,setPorcentaje] = useState(0)
    const [disponible,setDisponible] = useState(0)
    const [ gastado,setGastado] = useState(0)
    

    useEffect(()=>{
        const totalGastado = gastos.reduce((total,gasto)=>gasto.cantidad + total,0)
        const totalDisponible = presupuesto-totalGastado

        //Calcular el porcentaje gastado:
        const nuevoPorcentaje = (((presupuesto-totalDisponible)/presupuesto)*100).toFixed(2)
        

        setGastado(totalGastado)
        setDisponible(totalDisponible)

        setTimeout(()=>{
            setPorcentaje(nuevoPorcentaje)
        },500)

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
            <CircularProgressbar
                value={porcentaje}
                //Configuracion de la grafica
                text={`${porcentaje}%`}
                styles={buildStyles({
                    pathColor: '#1BC090',
                    trailColor:'#B7E7D9',
                    textColor: '#1BC090'
                })}
                
            />
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

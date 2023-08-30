import { useState,useEffect } from "react"
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({
        gastos,
        setGastos,
        presupuesto,
        setPresupuesto,
        setIsValidPresupuesto
    }) => {

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

    //Funcion para reiniciar todo
    const hanldeResetApp=()=>{
        const resultado = confirm('Estas seguro de resetear app?')
        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
                value={porcentaje}
                //Configuracion de la grafica
                text={`${porcentaje}%`}
                styles={buildStyles({
                    pathColor: porcentaje>100?'#BD1515': '#1BC090',
                    trailColor:'#B7E7D9',
                    textColor: porcentaje>100?'#BD1515': '#1BC090'
                })}
                
            />
        </div>
        <div className='contenido-presupuesto'>
            <button 
                className="reset-app" 
                type="button"
                onClick={hanldeResetApp}
            >
                Reset App
            </button>
            <p>
                <span>Presupuesto: </span> {formatearPrecio(presupuesto)}
            </p>
            <p className={`${disponible<0?'negativo':''}`}>
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

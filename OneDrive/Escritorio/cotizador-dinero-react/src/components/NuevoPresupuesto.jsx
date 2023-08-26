import { useState } from "react"
import Mensaje from "./Mensaje"

const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto
  }) =>{
  const [mensaje,setMensaje] = useState('')

  //Validamos que el input sea un numero y no otra cosa
  const handlePresupuesto = (e)=>{
    e.preventDefault()
    if(!Number(presupuesto) || Number(presupuesto)<0){
      setMensaje('No es un presupuesto valido')
      return
    }
    //Si tenemos un presupuesto valido:
    setMensaje('')
    setIsValidPresupuesto(true)
    
  }
  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form onSubmit={handlePresupuesto} action="" className='formulario'>
        <div className='campo'>
            <label >Definir Presupuesto</label>
            <input 
                
                className='nuevo-presupuesto'
                type="text" 
                placeholder='Anade tu Presupuesto'
                value={presupuesto}
                onChange={e=>setPresupuesto(e.target.value)}
            />
        </div>
        <input type="submit" value="Anadir" />
        {mensaje && <Mensaje tipo ="error">{mensaje}</Mensaje>}
      </form>
    </div>
  )
}

export default NuevoPresupuesto

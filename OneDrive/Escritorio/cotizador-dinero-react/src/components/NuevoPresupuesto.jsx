import React from 'react'

const NuevoPresupuesto = () => {
  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form action="" className='formulario'>
        <div className='campo'>
            <label >Definir Presupuesto</label>
            <input 
                className='nuevo-presupuesto'
                type="text" 
                placeholder='Anade tu Presupuesto'
            />
        </div>
        <input type="submit" value="Anadir" />
      </form>
    </div>
  )
}

export default NuevoPresupuesto

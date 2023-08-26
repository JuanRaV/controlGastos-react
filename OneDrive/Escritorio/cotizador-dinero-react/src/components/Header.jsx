import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'

const Header = ({
    presupuesto,
    setPresupuesto,
    isValidPresupuesto,
    setIsValidPresupuesto
  }) => {
  return (
    <header>
        <h1>Planficador de Gastos</h1>
        {/* Si el presupuesto es valido cargamos la siguiente pagina,
        Si no se queda en la de definir presupuesto  */}
        {isValidPresupuesto ? (
          <p>Control Presupuesto</p>
        ):(
          <NuevoPresupuesto
            presupuesto = {presupuesto}
            setPresupuesto = {setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />
        )}

    </header>
  )
}

export default Header

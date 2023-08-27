import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({
    gastos,
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
          <ControlPresupuesto
            gastos={gastos}
            presupuesto={presupuesto}
          />
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

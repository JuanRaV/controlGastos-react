import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({
    gastos,
    filtro,
    gastosFiltrados,
    setGastoEditar,
    eliminarGasto,
  }) => {
  return (
    <div className='listado-gastos contenedor'>
        {/* Si hay algun filtro se itera sobre ellos si no ,sobre todos los gastos */}
        {
          filtro ?  (
            <>
              <h2>{gastosFiltrados.length ? 'Gastos': 'No Hay Gastos Aun'}</h2>
              {gastosFiltrados.map(gasto=>(
                <Gasto
                    key = {gasto.id}
                    gasto ={gasto}
                    setGastoEditar= {setGastoEditar}
                    eliminarGasto={eliminarGasto}
                />
              ))}
            </>
          ):(
            <>
              <h2>{gastos.length ? 'Gastos': 'No Hay Gastos Aun'}</h2>
              {gastos.map(gasto=>(
                <Gasto
                    key = {gasto.id}
                    gasto ={gasto}
                    setGastoEditar= {setGastoEditar}
                    eliminarGasto={eliminarGasto}
                />
              ))}
          </>
          )
        }

      
    </div>
  )
}

export default ListadoGastos

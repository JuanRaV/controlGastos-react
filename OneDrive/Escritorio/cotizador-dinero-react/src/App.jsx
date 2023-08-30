import { useState,useEffect } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { generarId } from './helpers'

function App() {

  const[gastos,setGastos] = useState([])
  const [presupuesto,setPresupuesto] = useState(0)
  const [isValidPresupuesto,setIsValidPresupuesto] = useState(false)
  const [modal,setModal] = useState(false)
  const [animarModal,setAnimarModal] = useState(false)
  const [gastoEditar,setGastoEditar] = useState({})
  // const [gastoEliminar,setGastoEliminar] = useState()

  useEffect(()=>{
    //Esperamos hasta que se quiera editar un gasto se ejectuta el effect
    if(Object.keys(gastoEditar).length>0){
      setModal(true)
      setTimeout(()=>{
          setAnimarModal(true)
      },500)
    } 
  },[gastoEditar])

  const handleNuevoGasto =()=>{
    //Reiniciamos el objeto de editar para que no aparezca cuando querramos crear un nuevo gasto
    setGastoEditar({})
    setModal(true)
    setTimeout(()=>{
        setAnimarModal(true)
    },500)
  }

  const guardarGasto = gasto=>{
    console.log(gasto)
    if(gasto.id){
      //Actualizamos 
      const gastoActualizado = gastos.map(gastoState=>gastoState.id===gasto.id?gasto:gastoState)

      setGastos(gastoActualizado)
    }else{
      //Nuevo gasto
      gasto.id= generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos,gasto])
    }


    //Cerramos el modal 
    setAnimarModal(false)
    setTimeout(()=>{
        setModal(false)
    },500)
    console.log(gasto)
  }

  const eliminarGasto = id=>{
    const gastosActualizaos = gastos.filter(gasto=>gasto.id!==id)
    setGastos(gastosActualizaos)
  }
  return (
      <div className={modal?'fijar':''}>
        <Header
          gastos = {gastos}
          presupuesto = {presupuesto}
          setPresupuesto = {setPresupuesto}
          isValidPresupuesto = {isValidPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
        {isValidPresupuesto && (
          <>
          <main>
            <ListadoGastos
              gastos = {gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto = {eliminarGasto}
            />
          </main>
            <div className='nuevo-gasto'>
              <img 
                src={IconoNuevoGasto} 
                alt="icono nuevo gasto"
                onClick={handleNuevoGasto}
              />
            </div>
          </>

        )}

        {modal && 
        <Modal
            setModal = {setModal}
            animarModal = {animarModal}
            setAnimarModal = {setAnimarModal}
            guardarGasto={guardarGasto}
            gastoEditar={gastoEditar}
        />}
      </div>
      
  )
}

export default App

import { useState,useEffect } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Filtros from './components/Filtros'
import Modal from './components/Modal'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { generarId } from './helpers'

function App() {

  const[gastos,setGastos] = useState(
    //Si hay gastos en locaStorage convertimos de string a arreglo
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const [presupuesto,setPresupuesto] = useState(
    //Si no hay elemnto en local storage, su valor inicial sera 0
    Number(localStorage.getItem('presupuesto'))??0
  )

  const [isValidPresupuesto,setIsValidPresupuesto] = useState(false)
  const [modal,setModal] = useState(false)
  const [animarModal,setAnimarModal] = useState(false)
  const [gastoEditar,setGastoEditar] = useState({})
  const [filtro,setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(()=>{
    //Esperamos hasta que se quiera editar un gasto se ejectuta el effect
    if(Object.keys(gastoEditar).length>0){
      setModal(true)
      setTimeout(()=>{
          setAnimarModal(true)
      },500)
    } 
  },[gastoEditar])

  //Almacenar en localStorage el presupuesto
  //Se ejecuta cuando cambie el presupuesto
  useEffect(()=>{
    localStorage.setItem('presupuesto',presupuesto??0)
  },[presupuesto])

  //Se ejecuta cuando cambbien los gastos
  useEffect(()=>{
    localStorage.setItem('gastos',JSON.stringify(gastos)??[])
  },[gastos])

  //UseEffect para filtrar gastos por categoria
  useEffect(()=>{
    if (filtro){
      const gastosFiltrados= gastos.filter(gasto=>gasto.categoria===filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  },[filtro])
  useEffect(()=>{
    //Detecta que tengasmo algun presupuesto en local storage y nos lleva al panel de agregar gastos
    const presupuestoLocalStorage = Number(localStorage.getItem('presupuesto'))??0;
    if(presupuestoLocalStorage> 0){
      setIsValidPresupuesto(true)
    }
  },[])


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
      setGastoEditar({})
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
          setGastos={setGastos}
          presupuesto = {presupuesto}
          setPresupuesto = {setPresupuesto}
          isValidPresupuesto = {isValidPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
        {isValidPresupuesto && (
          <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos = {gastos}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
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
            setGastoEditar={setGastoEditar}
        />}
      </div>
      
  )
}

export default App

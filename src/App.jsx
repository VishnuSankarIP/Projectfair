
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Footer from './components/Footer'
import { useContext } from 'react'
import { tokenAuthContext } from '../context/TokenAuth'

function App() {

  const{isAuthorised,setIsAuthorised}=useContext(tokenAuthContext)
  return (
  <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth insideRegister/>}/>
      <Route path='/dashboard' element={isAuthorised?<Dashboard/>:<Navigate to={'/login'}/>}/>
      <Route path='/projects' element={isAuthorised?<Projects/>:<Navigate to={'/login'}/>}/>
      <Route path='/*' element={<navigator to={'/'}/>}/>

    </Routes>
    <Footer/>

    </>
  
  )
}

export default App

import React, { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function Header({insideDashboard}) {
  const{isAuthorised,setIsAuthorised}=useContext(tokenAuthContext)
  const navigate=useNavigate()
  const logout=()=>{
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/')
  }
  return (
    <>
    <Navbar style={{zIndex:'1'}} className='card shadow top-0 position-fixed w-100'>
      <Container>
        <Navbar.Brand>
          <Link style={{textDecoration:'none',color:'#b8b8ff'}} className='fw-bolder' to={'/'}>Project Fair</Link>
        </Navbar.Brand>
       {insideDashboard &&
       <div className="ms-auto">
       <button onClick={logout} className='btn btn-link'>Logout</button>
     </div>
       } 
      </Container>
    </Navbar>


    
    </>
  )
}

export default Header
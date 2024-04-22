import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginImage from '../assets/login.webp'
import { Button, FloatingLabel, Form } from 'react-bootstrap'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI';
import { tokenAuthContext } from '../../context/TokenAuth';

function Auth({ insideRegister }) {

const{isAuthorised,setIsAuthorised}=useContext(tokenAuthContext)
  const navigate = useNavigate()
  const [userInputs, setUserInputs] = useState({ username: "", email: "", password: "" })
  console.log(userInputs);
  const handleRegister = async (e) => {
    e.preventDefault()
    if (userInputs.username && userInputs.email && userInputs.password) {
      // api call

      try {
        const result = await registerAPI(userInputs)
        console.log(result);
        if (result.status == 200) {

          toast.success(`Welcome ${result.data.username}.... Please Login to explore website `)
          setUserInputs({ username: "", email: "", password: "" })
          setTimeout(() => {
            navigate('/login')
          }, 2000)

        }
        else {
          toast.error(result.response.data)
          setTimeout(() => {
            setUserInputs({ username: "", email: "", password: "" })
          }, 2000)
        }

      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      toast.warning("Please Fill the form")
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (userInputs.email && userInputs.password) {
      //  api call
      try {

        const result = await loginAPI(userInputs)

        if (result.status == 200) {

          // store session storage
          sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
          sessionStorage.setItem("token", result.data.token)
            setIsAuthorised(true)
          toast.success(`Welcome ${result.data.existingUser.username}....  `)
          setUserInputs({ username: "", email: "", password: "" })
          setTimeout(() => {
            navigate('/')
          }, 2000)

        }
        else {
          toast.error(result.response.data)

        }

      }
      catch (err) {
        console.log(err);
      }

    }
    else {
      toast.warning("please fill form completely")
    }
  }
  return (
    <>
      <div style={{ width: '100%', height: '100vh' }} className=' d-flex justify-content-center align-items-center'>
        <div className="container w-75">
          <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }} >Back to Home</Link>
          <div className="card shadow p-5" style={{ backgroundColor: '#b8b8ff' }}>
            <div className="row">
              <div className="col-lg-6">
                <img src={loginImage}></img>
              </div>
              <div className="col-lg-6 ">
                <h1 className='fw-bolder ms-5' >Project fair</h1>
                <h3 className=' ms-5' >Sign {insideRegister ? 'up' : 'in'}  to your account</h3>
                <div className="formDiv mt-5">

                  <Form>
                    {insideRegister ? <div>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="username"
                        className="mb-3"
                      >

                        <Form.Control value={userInputs.username} onChange={e => setUserInputs({ ...userInputs, username: e.target.value })} type="text" placeholder="username" />
                      </FloatingLabel>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                      >

                        <Form.Control value={userInputs.email} onChange={e => setUserInputs({ ...userInputs, email: e.target.value })} type="email" placeholder="name@example.com" />
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control value={userInputs.password} onChange={e => setUserInputs({ ...userInputs, password: e.target.value })} type="password" placeholder="Password" />
                      </FloatingLabel>
                    </div> :
                      <div>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Email address"
                          className="mb-3"
                        >

                          <Form.Control type="email" value={userInputs.email} onChange={e=>setUserInputs({...userInputs, email: e.target.value})} placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password">
                          <Form.Control type="password" value={userInputs.password} onChange={e => setUserInputs({ ...userInputs, password: e.target.value })}  placeholder="Password" />
                        </FloatingLabel>
                      </div>}
                  </Form>

                  {/* <div className="BtnDiv text-center">
      <Button className='btn btn-primary mt-3 text-center'>Login</Button>
      </div>
     */}
                </div>
                {
                  insideRegister ?
                    <div className="mt-3">
                      <button onClick={handleRegister}
                        className='btn btn-primary'>Register</button>
                      <p className='mt-2'>Already have an Account?Click here to <Link style={{ color: 'black' }} to={'/login'}>Login</Link></p>
                    </div>
                    :
                    <div className="mt-3">
                      <button  onClick={handleLogin} className='btn btn-primary'>Login</button>
                      <p>New User?Click here to <Link style={{ color: 'black' }} to={'/register'}>Registration</Link></p>
                    </div>
                }

              </div>
            </div>
          </div>
        </div>
        <ToastContainer position='top-center' theme='colored' autoClose={3000} />
      </div>

    </>

  )
}

export default Auth
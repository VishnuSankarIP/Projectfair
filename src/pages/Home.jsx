import React, { useEffect, useState } from 'react'
import landingPage from '../assets/logo.webp'
import ProjectCard from '../components/ProjectCard'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Projects from './Projects'
import { getHomeProjectsAPI } from '../services/allAPI'


function Home() {
  const [homeProjects, setHomeProjects] = useState([])
  const navigate = useNavigate()
  const [loginStatus, setLoginStatus] = useState(false)
  console.log(homeProjects);
  useEffect(() => {

    getHomeProjects()
    if (sessionStorage.getItem("token")) {
      setLoginStatus(true)
    }
    else {
      setLoginStatus(false)
    }
  }, [])

  const handleProjects = () => {
    if (loginStatus) {
      navigate('/projects')
    }
    else {
      toast.warning("Please login to get full access")
    }
  }

  const getHomeProjects = async () => {
    try {
      const result = await getHomeProjectsAPI()
      console.log(result);
      if (result.status == 200) {
        setHomeProjects(result.data)
      }

    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      {/* landing page */}
      <div style={{ height: '100vh', backgroundColor: '#b8b8ff' }} className='w-100 d-flex justify-content-center align-items-center rounded'>
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="container ms-5 mt-5 ">
              <h1 style={{ fontSize: '80px', fontWeight: '800', color: 'white' }}><i class="fa-solid fa-diagram-project"></i>Project Fair</h1>
              <h6 style={{ color: 'white' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, voluptatum libero necessitatibus eaque eius ipsum reprehenderit quas labore alias, nulla voluptatem sapiente veniam velit dolor odit odio. Fuga, eius sit?</h6>
              {loginStatus ?
                <Link to={'/dashboard'}><button className='p-2 rounded' style={{ backgroundColor: '#8a2be2', border: 'none', color: 'white' }}>Manage your Projects</button></Link> :

                <Link to={'/login'}><button className='p-2 rounded' style={{ backgroundColor: '#8a2be2', border: 'none', color: 'white' }}>Starts to Explore</button></Link>
              }            </div>
          </div>
          <div className="col-lg-6 ">
            <img src={landingPage} style={{ width: '600px' }}></img>
          </div>
        </div>
      </div>
      {/* projects */}
      <div className="mt-5">
        <h1 className='text-center' style={{ fontWeight: '500' }}>Explore Our Projects</h1>
        <marquee>

          <div className="d-flex mt-4">
            {homeProjects?.length>0 && 
            homeProjects?.map(project=>( <div key={project} className="me-5">
            <ProjectCard  displayData={project}/>
          </div>))
             
            }


          </div>

        </marquee>
        <div className='text-center'>
          <button onClick={handleProjects} className='btn btn-link '>Click here to view more projects..</button>
        </div>


      </div>
      {/* testimony */}
      <h1 className='text-center' style={{ fontWeight: '500' }}>Testimony</h1>
      <div className="d-flex justify-content-evenly mt-5 ms-3 w-100" >

        <Card style={{ width: '18rem', backgroundColor: '#b8b8ff' }}>
          <div className="div">
            <div className="d-flex ms-3 mt-3">
              <div className="col-lg-4"><img width={'60px'} height={'60px'} src='https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png'></img></div>
              <div className="col-lg-8"><Card.Text className='mt-3'>Miller</Card.Text>
                <Card.Text>
                  <div className="d-flex" >
                    <i class="fa-solid fa-star text-warning" ></i>
                    <i class="fa-solid fa-star text-warning" ></i>
                    <i class="fa-solid fa-star text-warning" ></i>
                    <i class="fa-solid fa-star text-warning" ></i>
                    <i class="fa-regular fa-star text-warning" ></i>
                  </div>
                </Card.Text></div>
            </div>
          </div>

          <Card.Body>
            {/* <Card.Title>Miller</Card.Title> */}

            <Card.Text>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quui aut reprehenderit sequi corrupti officiis in hic maxime doloribus. Quos, nostrum vitae!</p>
            </Card.Text>

          </Card.Body>
        </Card>
        <Card style={{ width: '18rem', backgroundColor: '#b8b8ff' }}>
          <div className="div">
            <div className="d-flex ms-3 mt-3">
              <div className="col-lg-4"><img width={'60px'} height={'60px'} src='https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png'></img></div>
              <div className="col-lg-8"><Card.Text className='mt-3'>Miller</Card.Text>
                <Card.Text>
                  <div className="d-flex" >
                    <i class="fa-solid fa-star text-warning" ></i>
                    <i class="fa-solid fa-star text-warning" ></i>
                    <i class="fa-solid fa-star text-warning" ></i>
                    <i class="fa-solid fa-star text-warning" ></i>
                    <i class="fa-solid fa-star text-warning" ></i>
                  </div>
                </Card.Text></div>
            </div>
          </div>

          <Card.Body>
            {/* <Card.Title>Miller</Card.Title> */}

            <Card.Text>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quui aut reprehenderit sequi corrupti officiis in hic maxime doloribus. Quos, nostrum vitae!</p>
            </Card.Text>

          </Card.Body>
        </Card>
        <Card style={{ width: '18rem', backgroundColor: '#b8b8ff' }}>
          <div className="div">
            <div className="d-flex ms-3 mt-3">
              <div className="col-lg-4"><img width={'60px'} height={'60px'} src='https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png'></img></div>
              <div className="col-lg-8"><Card.Text className='mt-3'>Miller</Card.Text>
                <Card.Text>
                  <div className="d-flex" >
                    <i class="fa-solid fa-star text-warning" ></i>
                    <i class="fa-solid fa-star text-warning" ></i>
                    <i class="fa-solid fa-star text-warning" ></i>
                    <i class="fa-regular fa-star text-warning" ></i>
                    <i class="fa-regular fa-star text-warning" ></i>
                  </div>
                </Card.Text></div>
            </div>
          </div>

          <Card.Body>
            {/* <Card.Title>Miller</Card.Title> */}

            <Card.Text>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quui aut reprehenderit sequi corrupti officiis in hic maxime doloribus. Quos, nostrum vitae!</p>
            </Card.Text>

          </Card.Body>
        </Card>
        <ToastContainer position='top-center' theme='colored' autoClose={3000} />
      </div>
    </>

  )
}

export default Home
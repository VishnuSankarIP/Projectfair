import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Card, Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectsAPI } from '../services/allAPI'

function Projects() {

  const[searchKey,setSearchKey]=useState("")
  const [allProjects,setAllProjects]=useState([])
  console.log(allProjects);
  useEffect(()=>{
    getAllProjects()
  },[searchKey])


const getAllProjects=async()=>{
  const token=sessionStorage.getItem("token")
  const reqHeader={
    "Authorization": `Bearer ${token}`
  }
  try{
    const result=await getAllProjectsAPI(searchKey,reqHeader)
    console.log(result);
    if(result.status==200)
    {
      setAllProjects(result.data)
    }
  }catch(err)
  {
    console.log(err);
  }
}

  return (
    <>
  <Header/>
  <div className="container-fluid" style={{marginTop:'150px'}}>
    <div className="d-flex justify-content-between">
      <h1 className='ms-5'>All Projects</h1>
      <div><input onChange={e=>setSearchKey(e.target.value)} type="text" placeholder="Search here" className='form-control'></input></div>
      
    </div>

  </div>
  <Row className='mt-5 ms-5 '>
    {
      allProjects?.length>0?
      allProjects?.map(project=>(<Col className='mb-3' key={project} sm={12} md={6} lg={4}>
        <ProjectCard displayData={project}/>
      </Col>))
       :
    <div className="div text-danger m-5">Project not found!!!</div>

    }
   
  </Row>


  </>
  )
}

export default Projects
import React, { useContext, useEffect, useState } from 'react'
import Edit from '../components/Edit'
import Add from '../components/Add'
import { getUserProjectsAPI, removeProjectAPI } from '../services/allAPI'
import { addResponseContext, editResponseContext } from '../../context/ContextAPI'


function View() {

 const{editResponse,setEditResponse}=useContext(editResponseContext)
  const { addResponse, setAddResponse } = useContext(addResponseContext)
  const [userProjects, setUserProjects] = useState([])

  console.log(userProjects);
  useEffect(() => {
    getUserProjects()
  }, [addResponse,editResponse]) 

  const getUserProjects = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await getUserProjectsAPI(reqHeader)
      console.log(result);
      if (result.status == 200) {
        setUserProjects(result.data)
      }
    } catch (err) {
      console.log(err);
    }

  }
  const handleDeleteProject=async(projectId)=>{
    const token=sessionStorage.getItem("token")
    if(token)
    {
      const reqHeader={
        "Context-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      // api call
      const result=await removeProjectAPI(projectId,reqHeader)
      if(result.status==200)
      {
        getUserProjects()
      }
      else{
        console.log(result);
      }

    }
  }



  return (
    <>
      <div className="d-flex justify-content-between border p-2 rounded mb-3 w-100">
        <h2>All Projects</h2>
        <button className='btn btn-primary'><Add /></button>
      </div>
      <div className="mt-3">
        {userProjects?.length > 0 ?
          userProjects?.map(project => (<div className="d-flex justify-content-between border mb-3 p-2 rounded " >
            <h3>{project?.title}</h3>
            <div className="icons d-flex">
              <div className="btn"> <Edit project={project} /></div>
              <div className="btn "><a href={project?.github} target='_blank'><i class="fa-brands fa-github fa-2x"></i></a></div>
              <button onClick={()=>handleDeleteProject(project?._id)} className="btn"><i class="fa-solid fa-trash fa-2x"></i></button>

            </div>
          </div>))
          :
          <div className='fw-bolder text-warning'>No project uploaded yet!!!</div>
        }

      </div>


    </>
  )
}

export default View
import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import uploadImage from '../assets/upload.jpg'
import { SERVER_URL } from '../services/serverUrl';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectsAPI } from '../services/allAPI';
import { editResponseContext } from '../../context/ContextAPI';

function Edit({ project }) {

  console.log(project);
  const [show, setShow] = useState(false);
  const {editResponse,setEditResponse}=useContext(editResponseContext)

  const [projectData, setProjectData] = useState({
    id: project?._id, title: project?.title, language: project?.language, overview: project?.overview, github: project?.github, website: project?.website,
    projectImage: ""
  })
  const [preview, setPreview] = useState("")

  const handleClose = () => {
    setShow(false);
    setProjectData({
      id: project?._id, title: project?.title, language: project?.language, overview: project?.overview, github: project?.github, website: project?.website,
      projectImage: ""
    })
    setPreview("")
  }
  const handleShow = () => {

    setShow(true);
    setProjectData({
      id: project?._id, title: project?.title, language: project?.language, overview: project?.overview, github: project?.github, website: project?.website,
      projectImage: ""
    })

  }

  useEffect(() => {
    if (projectData.projectImage) {
      setPreview(URL.createObjectURL(projectData.projectImage))
    }
    else {
      setPreview("")
    }

  }, [projectData.projectImage])

const handleUpdateProject=async()=>{
  const {title,language,overview,github,website,projectImage}=projectData
  if(!title || !language || !overview || !github || !website )
  {
      toast.warning("Please fill the form")
  }
  else{
      //proceed api call
      const reqBody=new FormData()
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("overview", overview)
      reqBody.append("github", github)
      reqBody.append("website", website)
      preview?reqBody.append("projectImage", projectImage):reqBody.append("projectImage",project.projectImage)
      const token=sessionStorage.getItem("token")
      if(token)
      {
        const reqHeader = {
          "Content-Type": preview?"multipart/form-data":"application/json",
          "Authorization": `Bearer ${token}`
      }
      // api call
      try{
          const result=await editProjectsAPI(projectData.id,reqBody,reqHeader)
          console.log(result);
          if(result.status==200)
          {
            handleClose()
            // pass response view
            setEditResponse(result)
          }
          else{
            console.log(result.response);
          }
      }
      catch(err)
      {
        console.log(err);
      }

  }
  
}
}

  return (
    <>
      <button onClick={handleShow} className='btn btn-primary'><i className='fa-solid fa-edit me-2'></i>Edit</button>
      <Modal
        size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered

      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-4">
              <label>
                <input onChange={e => setProjectData({ ...projectData, projectImage: e.target.files[0] })} type='file' style={{ display: 'none' }}></input>
                <img src={preview ? preview : `${SERVER_URL}/uploads/${project?.projectImage}`} className='img-fluid'></img>
              </label>
            </div>
            <div className="col-lg-8">
              <input value={projectData?.title} onChange={e => setProjectData({ ...projectData, title: e.target.value })} type='text' className='form-control mb-2' placeholder='Project Title'></input>
              <input value={projectData?.language} onChange={e => setProjectData({ ...projectData, language: e.target.value })} type='text' className='form-control mb-2' placeholder='Language Used '></input>
              <input value={projectData?.github} onChange={e => setProjectData({ ...projectData, github: e.target.value })} type='text' className='form-control mb-2' placeholder='project Github Link'></input>
              <input value={projectData?.website} onChange={e => setProjectData({ ...projectData, website: e.target.value })} type='text' className='form-control mb-2' placeholder='Project Website Link'></input>
              <input value={projectData?.overview} onChange={e => setProjectData({ ...projectData, overview: e.target.value })} type='text' className='form-control' placeholder='Project Overview'></input>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateProject}>Edit</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
      </>
     

  )
}

export default Edit
import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import uploadImage from '../assets/upload.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allAPI';
import { addResponseContext } from '../../context/ContextAPI';

function Add() {

  const {addResponse,setAddResponse}=useContext(addResponseContext)
  const [preview, setPreview] = useState("")
  const [projectDetails, setProjectDetails] = useState({ title: "", language: "", overview: "", github: "", website: "", projectImage: "" })
  console.log(projectDetails);

  const [imageFileStatus, setImageFileStatus] = useState(false)

  useEffect(() => {
    if (projectDetails.projectImage.type == "image/png" || projectDetails.projectImage.type == "image/jpg" || projectDetails.projectImage.type == "image/jpeg") {
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
    else {
      setPreview(uploadImage)
      setImageFileStatus(false)
      setProjectDetails({ ...projectDetails, projectImage: "" })

    }

  }, [projectDetails.projectImage])

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setProjectDetails({ title: "", language: "", overview: "", github: "", website: "", projectImage: "" })
  }

  const handleShow = () => setShow(true);

  // fn to add project
  const handleUploadProject = async () => {
    const { title, language, overview, github, website, projectImage } = projectDetails
    if (!title || !language || !overview || !github || !website || !projectImage) {
      toast.warning("please fill the form")

    }
    else {

      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("overview", overview)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("projectImage", projectImage)

      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        // api call
        try {
          const result= await addProjectAPI(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
         setAddResponse(result)
            // toast.success(`'${result.data.title}' has added successfully`)
            handleClose()
          }
          else {
            toast.warning(result.response.data)
          }

        } catch (err) {
          console.log(err);
        }


      }

    }


  }


  return (
    <>
      <button onClick={handleShow} className='btn btn-primary'><i className='fa-solid fa-plus me-2'></i>Add new</button>
      <Modal
        size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered

      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-4">
              <label>
                <input onChange={e => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} type='file' style={{ display: 'none' }}></input>
                <img src={preview} className='img-fluid'></img>
              </label>
              {!imageFileStatus && <div className="text-danger my-2 fw-bolder" >*Upload only following types (png,jpg,jpeg) here!!</div>}
            </div>
            <div className="col-lg-8">
              <input value={projectDetails.title} onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} type='text' className='form-control mb-2' placeholder='Project Title'></input>
              <input value={projectDetails.language} onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} type='text' className='form-control mb-2' placeholder='Language Used '></input>
              <input value={projectDetails.github} onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} type='text' className='form-control mb-2' placeholder='project Github Link'></input>
              <input value={projectDetails.website} onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} type='text' className='form-control mb-2' placeholder='Project Website Link'></input>
              <input value={projectDetails.overview} onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} type='text' className='form-control' placeholder='Project Overview'></input>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUploadProject} variant="primary">upload</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  )
}

export default Add
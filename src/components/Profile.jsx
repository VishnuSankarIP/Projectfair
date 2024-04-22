import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import bgprofile from '../assets/Profile.png'
import { SERVER_URL } from '../services/serverUrl'
import { updateUserAPI } from '../services/allAPI'
function Profile() {

  const[preview,setPreview]=useState("")
  const[existingImg,setExistingImg]=useState("")
  
  const[userDetails,setUserDetails]=useState({username:"",email:"",password:"",github:"",linkedin:"",profileImage:""})
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      const existingUserDetails=JSON.parse(sessionStorage.getItem("existingUser"))
      setUserDetails({...userDetails,username:existingUserDetails.username,email:existingUserDetails.email,password:existingUserDetails.password,github:existingUserDetails.github,
        linkedin:existingUserDetails.linkedin})
      setExistingImg(existingUserDetails.profile)

    }
    

  },[open])

  useEffect(()=>{
    if(userDetails.profileImage)
    {
      setPreview(URL.createObjectURL(userDetails.profileImage))
    }
    else{
      setPreview("")
    }
  },[userDetails.profileImage])

  const handleUserProfile=async()=>{
    const {username,email,password,github,linkedin,profileImage}=userDetails
    if(!github || !linkedin)
    {
        alert("please fill the form")
    }
    else{
      const reqBody= new FormData()
      reqBody.append("username", username)
      reqBody.append("email", email)
      reqBody.append("password",password)
      reqBody.append("github", github)
      reqBody.append("linkedin", linkedin)
     preview?reqBody.append("profileImage", profileImage):reqBody.append("profileImage",existingImg)
     const token = sessionStorage.getItem("token")
     if (token) {
       const reqHeader = {
         "Content-Type": preview?"multipart/form-data":"application/json",
         "Authorization": `Bearer ${token}`
       }
      //  api call
      try{
        const result=await updateUserAPI(reqBody,reqHeader)
        if(result.status==200)
        {
          setOpen(!open)
          sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        }
        else{
          console.log(result);
        }

      }catch(err){
        console.log(err);
      }
     
      }

    }
  }

  return (
    <>
   <div className="d-flex justify-content-center">
    <h3 className='text-primary'>User Profile</h3>
    <button  onClick={() => setOpen(!open)} className='btn'><i class="fa-solid fa-chevron-down "></i></button>
   </div>
   <Collapse in={open}>
        <div className='row justify-content-center shadow mt-3' id="example-collapse-text">
          <label>
            <input onChange={e=>setUserDetails({...userDetails,profileImage:e.target.files[0]})} type='file' style={{display:'none'}} ></input>

          { existingImg==""?
           <img width={'200px'} src={preview?preview:bgprofile}></img>
           :
           <img width={'200px'} src={preview?preview:`${SERVER_URL}/uploads/${existingImg}`}></img>

          }

          </label>
          <div className="mb-2">
            <input value={userDetails.github} onChange={e=>setUserDetails({...userDetails,github:e.target.value})} type='text' placeholder='GitHub Link' className='form-control'></input>
          </div>
          <div className="mb-2">
            <input value={userDetails.linkedin} onChange={e=>setUserDetails({...userDetails,linkedin:e.target.value})} type='text' placeholder='LinkedIn Link' className='form-control'></input>
          </div>
          <div className="d-grid">
            <button onClick={handleUserProfile} className='btn btn-warning'>Update Profile </button>
          </div>
        </div>
      </Collapse>
    </>
  )
}

export default Profile
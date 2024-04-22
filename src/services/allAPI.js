
import { commonAPI } from "./commonAPI"
import { SERVER_URL } from "./serverUrl"


// register api-called by auth component
export const registerAPI=async(reqBody)=>{
   return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}


// login api-called by auth component
export const loginAPI=async(reqBody)=>{
   return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}
// add project-called by add component
export const addProjectAPI=async(reqBody,reqHeader)=>{
   return await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}


// get all-projects

export const getAllProjectsAPI=async(searchKey,reqHeader)=>{
   return await commonAPI("GET",`${SERVER_URL}/all-projects?search=${searchKey}`,"",reqHeader)
}

// user-projects

export const getUserProjectsAPI=async(reqHeader)=>{
   return await commonAPI("GET",`${SERVER_URL}/user-projects`,"",reqHeader)
}

// home -projects

export const getHomeProjectsAPI=async()=>{
   return await commonAPI("GET",`${SERVER_URL}/home-projects`,"")
}

// editproject


export const editProjectsAPI=async(projectId,reqBody,reqHeader)=>{
   return await commonAPI("PUT",`${SERVER_URL}/edit-project/${projectId}`,reqBody,reqHeader)
}

// remove project 

export const removeProjectAPI=async(projectId,reqHeader)=>{
   return await commonAPI("DELETE",`${SERVER_URL}/remove-project/${projectId}`,{},reqHeader)

}

// updateuser

export const updateUserAPI=async(reqBody,reqHeader)=>{
   return await commonAPI("PUT",`${SERVER_URL}/edit-user`,reqBody,reqHeader)

}

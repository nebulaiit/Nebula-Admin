import axios from 'axios';  
import { API_BASE_URL, API_URLs } from './constant';


export const registerUser = async (body) =>{

    const url = `${API_BASE_URL}${API_URLs.REGISTER}`

  
    try {
        const response = await axios.post(url, body)
        console.log(response);
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
}

export const loginUser = async (body) =>{

    const url = `${API_BASE_URL}${API_URLs.LOGIN}`

    try {
        const response = await axios.post(url, body)
        return response.data;
        console.log(response);
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
}

export const getUserList = async ()=>{
    const url = `${API_BASE_URL}${API_URLs.USER_LIST}`;

    try {
        const response = await axios.get(url);
        // console.log(response);
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
}  

export const getUserDetials = async (userId)=>{
    const url = `${API_BASE_URL}${API_URLs.USER_DETIALS}/${userId}`;

    try {
        const response = await axios.get(url);
        // console.log(response);
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
} 

export const addNewTutorial = async (token, {tutorialName})=>{
    const url = `${API_BASE_URL}${API_URLs.ADD_TUTORIAL}`;
    console.log({tutorialName});
    try {
        const response = await axios.post(url, {tutorialName},
                    { headers: {
                        Authorization:` Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                });
        console.log(response);
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
} 

export const getAllTutorial = async ()=>{
    const url = `${API_BASE_URL}${API_URLs.GET_ALL_TUTORIAL}`;

    try {
        const response = await axios.get(url);
        // console.log(response);
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
} 

export const getTutorialByName = async (tutorialName)=>{
    const url = `${API_BASE_URL}${API_URLs.GET_TUTORIAL_BY_NAME}/${tutorialName}`;

    try {
        const response = await axios.get(url);
        // console.log(response);
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
} 

export const addNewHeading = async (id,token, {tutorialName})=>{
    const url = `${API_BASE_URL}${API_URLs.ADD_TUTORIAL}`;
 
    try {
        const response = await axios.post(url, {tutorialName},
                    { headers: {
                        Authorization:` Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                });
        console.log(response);
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
} 

export const getAllCourse = async ()=>{
    const url = `${API_BASE_URL}${API_URLs.GET_COURSE_LIST}`;

    try {
        const response = await axios.get(url);
        // console.log(response);
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
} 

export const getCourseDetailsById = async (id)=>{
    const url = `${API_BASE_URL}${API_URLs.GET_COURSE_LIST}/${id}`;

    try {
        const response = await axios.get(url);
        // console.log(response);
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
} 

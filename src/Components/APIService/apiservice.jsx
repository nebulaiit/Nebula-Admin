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
        console.log(response);
        return response.data;
        
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


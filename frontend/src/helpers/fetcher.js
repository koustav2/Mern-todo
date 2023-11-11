import axios from 'axios';

export const getData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return error.message;
    }
};

export const postData = async (url, data) => {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        return error.message;
    }
};

export const putData = async (url, data) => {
    try {
        const response = await axios.put(url, data);
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        return error.message;
    }
};

export const deleteData = async (url) => {
    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
        return error.message;
    }
};

export const getDataById = async (url, id) => {
    try {
        const response = await axios.get(`${url}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data by ID:', error);
        return error.message;
    }
};

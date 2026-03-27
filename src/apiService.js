// config = {
//     subject,
//     title,
//     content
// }
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

export const apiService = {

    addMaterial: async (config) => {
        const response = await axios.post(`${API_BASE_URL}/${config.subject.toLowerCase()}/add/`, {
            title: `${config.title}`,
            content: `${config.content}`,
        });
        console.log(response);
    },
    takeTest: async (config) => {

    },
    revision: async (config) => {

    },
    viewMaterial: async (config) => {
        const response = await axios.get(`${API_BASE_URL}/${config.subject.toLowerCase()}/view/`);
        return response.data
    }
};
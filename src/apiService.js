// config = {
//     subject,
//     title,
//     content
// }
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

export const apiService = {

    addMaterial: async (config) => {
        const response = await axios.post(`${API_BASE_URL}/${config.subjecttoLowerCase()}/add`, {
            title: `${config.title}`,
            content: `${config.content}`,
        });
        console.log(response);
    },
    takeTest: async (config) => {

    },
    revision: async (config) => {

    },
    editMaterial: async (config) => {

    }
};
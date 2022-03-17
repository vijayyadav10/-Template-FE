import axios from 'axios';

// const apiEndpoint = 'http://localhost:1337/api/templates';
const apiEndpoint = 'http://localhost:8082/api/templates';

export const getTemplate = async () => {
    let url = `${apiEndpoint}`;
    const data = await axios.get(url);
    return data;
}

// GET Collection Type
export const getCollectionTypes = async (token) => {
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2MTM0MDIyLCJleHAiOjE2NDg3MjYwMjJ9.JbSvPdP5D-WNeDIvOX7SYELMdKW-NdrBFYkcROhr0-A'
    const data = await axios.get(`http://localhost:1337/content-manager/content-types`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return data;
}

export const postTemplate = async (data) => {
    let url = `${apiEndpoint}`;
    await axios.post(url, data);
}

export const deleteTemplate = async (codeId) => {
    return await axios.delete(`${apiEndpoint}/${codeId}`)
}

export const editTemplate = async (codeId, data) => {
    return await axios.put(`${apiEndpoint}/${codeId}`, data)
}

export const getTemplateByCodeId = async (codeId) => {
    // let url = `${apiEndpoint}?filters[code][$eq]=${codeId}`;
    const data = await axios.get(`${apiEndpoint}/${codeId}`);
    return data;
}

// export const updateBydTemplateId = async (updatingValue) => {
//     await axios.put()
// }
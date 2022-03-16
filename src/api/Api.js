import axios from 'axios';

const apiEndpoint = 'http://localhost:1337/api/templates';

export const getTemplate = async () => {
    let url = `${apiEndpoint}`;
    const data = await axios.get(url);
    return data;
}

export const postTemplate = async (data) => {
    let url = `${apiEndpoint}`;
    await axios.post(url, data);
}

export const deleteTemplate = async (codeId) => {
    const { data: { data } } = await getTemplateByCodeId(codeId);
    const tempId = data[0].id;
    return await axios.delete(`${apiEndpoint}/${tempId}`)
}

export const editTemplate = async (codeId, dataToUpdate) => {
    const { data: { data } } = await getTemplateByCodeId(codeId);
    const tempId = data[0].id;
    return await axios.put(`${apiEndpoint}/${tempId}`, data)
}

export const getTemplateByCodeId = async (codeId) => {
    let url = `${apiEndpoint}?filters[code][$eq]=${codeId}`;
    const data = await axios.get(url);
    return data;
}

// export const updateBydTemplateId = async (updatingValue) => {
//     await axios.put()
// }
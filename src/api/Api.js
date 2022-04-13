import axios from 'axios';

// const apiEndpoint = 'http://localhost:1337/api/templates';
const apiEndpoint = 'http://localhost:8082/api/templates';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ4NDQxMjUwLCJleHAiOjE2NTEwMzMyNTB9.azaYPs05KQR_vkCltU3onTqhSWOuCpMvwaAt4VAcKTg';

export const getTemplate = async () => {
    let url = `${apiEndpoint}`;
    const data = await axios.get(url);
    return data;
}

// GET Collection Type
export const getCollectionTypes = async () => {
    const data = await axios.get(`http://localhost:1337/content-manager/content-types`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return data;
}


export const getFields = async (contentType) => {
    // const contentType = 'project'
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ4NDQxMjUwLCJleHAiOjE2NTEwMzMyNTB9.azaYPs05KQR_vkCltU3onTqhSWOuCpMvwaAt4VAcKTg'
    const {data: {results}} = await axios.get(`http://localhost:1337/content-manager/collection-types/api::${contentType}.${contentType}?page=1&pageSize=10&sort=Title:ASC`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    const fieldsArr = Object.keys(results[0]);
    const content = {};
    fieldsArr.map((el) => {
        content[el + "}}"] = [
            "getTextForLang(\"<LANG_CODE>\")",
            "text",
            "textMap(\"<LANG_CODE>\")"
        ]
        console.log('EL', el)
    })
    let timepass = {'content': content}
    console.log(timepass)
    return timepass;
}

// "$content": {
//     "title1": [
//         "getTextForLang(\"<LANG_CODE>\")",
//         "text",
//         "textMap(\"<LANG_CODE>\")"
//     ],
//         "title2": [
//             "getTextForLang(\"<LANG_CODE>\")",
//             "text",
//             "textMap(\"<LANG_CODE>\")"
//         ]
// }

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
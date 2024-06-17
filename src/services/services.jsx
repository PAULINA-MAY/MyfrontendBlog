
import { client, token } from "../api/client"



export const fetchPublishes = async () => {

    const res = await client.get('api/get/gelAllPublishes', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
    return res;
}

export const login = async (email, password) => {
    const res = await client.post('api/auth/login', {
        email: email,
        password: password
    });
    return res;

}

export const register = async (email, password, firstNames, lastNames) => {
    const res = await client.post('api/auth/register', {
        email: email,
        password: password,
        firstNames: firstNames,
        lastNames: lastNames
    });
    return res;
}

export const addNewComment = async(comment, id) =>{
    const res = await client.post(`api/post/createComent/${id}`,{
        content : comment
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
        }
    });
    return res;
}










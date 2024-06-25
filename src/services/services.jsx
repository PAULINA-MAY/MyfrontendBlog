import { jwtDecode } from 'jwt-decode'
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
    const user = jwtDecode(token);
    const res = await client.post(`api/post/createComent/${id}/${user._id}`,{
        content : comment
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
        }
    });
    return res;
}


export const getPublishByIdUser = async() =>{
    const user = jwtDecode(token);

    const res = await client.get(`api/get/getPublishByIdUser/${user._id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res;

}

export const addNewPublish = async (formData) => {
    const user = jwtDecode(token);
    try {
      const res = await client.post(`api/post/createPublish/${user._id}`, formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }
      );
      return res;
    } catch (error) {
      console.error("Error posting new publish:", error);
      throw error;
    }
  };

export const deletePublish = async(id) =>{
    try {
        const res = await client.delete(`api/delete/deletetPublishById/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }

        );
        return res;
        
    } catch (e) {
        console.log(e)
        throw e;
    }

}

export const updatePublish = async (id, formData) => {
    try {
        const res = await client.put(`api/put/updatePublish/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return res;
    } catch (e) {
        console.log(e)
        throw e;
    }
}









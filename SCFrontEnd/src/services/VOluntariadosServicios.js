import api from "../api/config";

export const getVOluntariado = async () => { 
    let data = await api.get('mostrar-voluntariado').then(result => result.data);
    return data;
};


export const getVOluntariadoID = async (id) => { 
    let data = await api.get(`voluntariado/${id}`).then(result => result.data);
    return data;
};


export const updateVOluntariado = async (newData) => { 
    
    console.log(newData);    
    
    let data = await api.put(`voluntariado-update/${newData.id}`, newData).then(result => result.data);
    return data;
};

export const create = async (voluntariado) => { 
    let data = await api.post('/create-voluntariado', voluntariado).then(result => result.data);
    return data;
};

export const eliminarVOluntariado = async (id) => {
        try {
            const response = await api.delete(`voluntariado-delete/${id}`);
            console.log(response.data);
        } catch (error) {
        
            console.error(error);
 }
};
import api from "../api/config";

export const getTipos = async () => { 
    let data = await api.get('ver-tipo').then(result => result.data);
    return data;
};

export const getTipoID = async (id) => { 
    let data = await api.get(`ver-tipo/${id}`).then(result => result.data);
    return data;
};

export const create = async (tipoVolCamp) => { 
    let data = await api.post('/create-tipoVolCamp', tipoVolCamp).then(result => result.data);
    return data;
};


export const eliminarTipo= async (id) => {
    try {
        const response = await api.delete(`delete-tipo/${id}`);
        console.log(response.data);
    } catch (error) {
    
        console.error(error);
    } 
};

export const updateTipo = async (newData) => { 
    
    console.log(newData);    
    // En este punto, `newData` debe ser un objeto con los datos de la reserva  a actualizar
    let data = await api.put(`update-tipo/${newData.id}`, newData).then(result => result.data);
    return data;
};

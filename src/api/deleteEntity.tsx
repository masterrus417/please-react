import axiosInstance from "./axiosConfig";


export async function deleteEntity(entityId: number) {
    await axiosInstance.delete(`api/v1/entity/${entityId}/deleted`);
};

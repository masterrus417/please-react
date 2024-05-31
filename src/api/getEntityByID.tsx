import axiosInstance from "./axiosConfig.tsx";

export async function getEntityByID(entityID: number) {
    try {
        const response = await axiosInstance.get(`api/v1/entity/${entityID}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

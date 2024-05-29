import axiosInstance from "./axiosConfig.tsx";

export async function getEntityStage(stageID: number) {
    try {
        const response = await axiosInstance.get(`api/v1/entity/${stageID}/stage`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
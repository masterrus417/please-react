import axiosInstance from "./axiosConfig.tsx";

export async function doActionOnStage(stageID: number, ractionID: number) {
    try {
        // Возвращаем данные
        return await axiosInstance.post(
            `/api/v1/stage/${stageID}`,
            {"raction_id": ractionID}
        );
    } catch (error) {
        console.error(error);
    }
}
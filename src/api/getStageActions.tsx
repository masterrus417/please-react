import axiosInstance from "./axiosConfig.tsx";
// import {StageActions} from "../types/entityStage.ts";

export async function getStageActions(stageID: number) {
    try {
        const response = await axiosInstance.get(`api/v1/entity/${stageID}/action`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
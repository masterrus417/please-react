import axiosInstance from "./axiosConfig";


export async function deleteEntityLink(entityId: number, linkEntityId: number) {
    await axiosInstance.delete(`api/v1/entity-link/${entityId}/link/${linkEntityId}/deleted`);
};

import axiosInstance from "./axiosConfig";


export async function addEntityLink(entityId: number, linkEntityId: number) {
  await axiosInstance.post(`api/v1/entity-link/${entityId}/link/${linkEntityId}/created`, {});
};

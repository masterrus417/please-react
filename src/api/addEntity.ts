import axiosInstance from "./axiosConfig";
import addEntityStore from "../stores/addEntity-store.ts";


export async function addEntity(entityType:string) {
  const res =  await axiosInstance.post(`api/v1/entity/${entityType}/created`, {});
  addEntityStore.setNewEntity(res.data);
  return addEntityStore.newEntityID;
};
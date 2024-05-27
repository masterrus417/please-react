import { Entity } from "./getEntity";
import axiosInstance from "./axiosConfig";

export async function updateEntity(entity: Entity) {
  return (await axiosInstance.patch(`api/v1/entity/${entity.entity_id}/update`, entity)).data[0]
};

import { Entity } from "./getEntity";
import { Entity as EntityType } from "../types/entity";
import axiosInstance from "./axiosConfig";

export async function updateEntity(entity: Entity | EntityType) {
  return (await axiosInstance.patch(`api/v1/entity/${entity.entity_id}/update`, entity)).data[0]
};

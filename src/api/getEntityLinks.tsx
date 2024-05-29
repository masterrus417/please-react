import { Entity } from "./getEntity";
import axiosInstance from "./axiosConfig";

export type EntityLink = {
  ent_ent_id: number,
  entity_link: [Entity],
  ts_created: string,
  ts_deleted: string,
  user_deleted: string,
  user_created: string,
  entity: number,
  entity_id_link: number
};

export const getEntityLinks = async (entityType: string, entityID: number) =>
  (await axiosInstance.get(`api/v1/entity-link/${entityType}/${entityID}/link`)).data
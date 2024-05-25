import axios from "axios";
import { axiosConfig } from "./config";
import { Entity } from "./getEntity";

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

export async function getEntityLinks(entityType: string, entityID: number) {

  try {
    const response = await axios.get(`/entity-link/${entityType}/${entityID}/link`, axiosConfig);
    if (response.status == 200){
      return await response.data;
    } else {
      throw new Error("Error");
    }
  } catch (error) {
    console.error(error);
  };
};
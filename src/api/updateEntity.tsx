import axios from "axios";
import { axiosConfig } from "./config";
import { Entity } from "./getEntity";

export async function updateEntity(entity: Entity) {

  try {
    const response = await axios.patch(`/entity/${entity.entity_id}/update`, entity, axiosConfig);
    if (response.status == 200){
      return response.data[0];
    } else {
      throw new Error("Error");
    }
  } catch (error) {
    console.error(error);
  };
};

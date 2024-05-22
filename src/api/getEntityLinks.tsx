import axios from "axios";
import { axiosConfig } from "./config";

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
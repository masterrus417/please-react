import entitiesStore, {Entity} from "../stores/entities-store.ts"; entitiesStore;
import axiosInstance from "./axiosConfig.tsx";

export const getEntities = async (entityType:string) =>
	(await axiosInstance.get<Entity>(`/api/v1/entity/${entityType}/type`)).data;
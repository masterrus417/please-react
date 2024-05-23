import entitiesStore from "../stores/entities-store.ts"; entitiesStore;
import axiosInstance from "./axiosConfig.tsx";


export type Posts = {
	id: number
	title: string
	body: string
	userId: number
};

export type entityTypes = {
	entity_attrs: [
		name: string,
		label: string,
		data: any
	]
	entity_id: number

}


export const getEntities = async (entityType:string) =>
	(await axiosInstance.get(`v1/entity/${entityType}/type`)).data;
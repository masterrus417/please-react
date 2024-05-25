import entitiesStore from "../stores/entities-store.ts"; entitiesStore;
import axiosInstance from "./axiosConfig.tsx";


export type EntityAttribute = {
  entity_attr_id: number,
  rattr_type: string,
  rattr_name: string,
  rattr_label: string,
  rattr_view: boolean,
  rattr_no: number,
  rattr_group_name: string,
  rattr_group_label: string,
  rattr_group_no: number,
  entity_attr_value: string,
  rattr: number,
  entity: number,
  read_only: boolean
};

export type Entity = {
  entity_id: number,
  rentity_type_name: string,
  rentity_type_label: string,
  current_stage: string[],
  ts_deleted: string,
  user_deleted: string,
  chatroom_uuid: string,
  ts_created: string,
  user_created: string,
  rentity_type: number,
	entity_attr: EntityAttribute[]
};



export const getEntities = async (entityType:string) =>
	(await axiosInstance.get<Entity>(`v1/entity/${entityType}/type`)).data;
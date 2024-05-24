import { makeAutoObservable } from 'mobx';

import { Entity, getEntity } from '../api/getEntity';
import { getEntityLinks } from '../api/getEntityLinks';
import { updateEntity } from '../api/updateEntity';

class EntityStore {
	entity?: Entity;
	links?: Entity[];
    isLoading: boolean = false;
	isChange: boolean = false;
	state: "loading" | "done" | "error" | "empty" = "empty";


    constructor() {
		makeAutoObservable(this);
	}

	getEntityAction = async (entityType: string, entityID: number) => {
		this.setState("loading");
		const [ cur_entity, cur_entity_links ] = await Promise.all(
			[
				getEntity(entityType, entityID),
				getEntityLinks(entityType, entityID)
			]
		);
		this.setEntity(cur_entity);
		this.setLinks(cur_entity_links);
		this.setState("done");
	}

    updateEntityAction = async (entityID: number) => {
		this.setState("loading");
		const [ cur_entity, cur_entity_links ] = await Promise.all(
			[
				updateEntity(this.entity as Entity),
				getEntityLinks(this.entity?.rentity_type_name as string, entityID)
			]
		);
		this.setEntity(cur_entity);
		this.setLinks(cur_entity_links);
		this.setState("done");
		console.log('Update!');
	}

	deleteEntityAction = () => {
		console.log('Delete!');
	}

	updateEntityAttribute = (rattrName: string, entityAttrValue: string) => {
		const attrIndex = this.entity?.entity_attr.findIndex(elem=>elem.rattr_name == rattrName) as number;
		if (this.entity){
			this.entity.entity_attr[attrIndex].entity_attr_value = entityAttrValue;
			this.setIsChange();
		};
	}

	setIsChange = () => {
		this.isChange = true;
	}

	setEntity = (newEntity: Entity) => {
		this.entity = newEntity;
	}

	setState = (newState: "loading"|"done"|"error"|"empty") => {
		this.state = newState;
	}

	setLinks = (newLinks: Entity[]) => {
		this.links = newLinks;
	}
}

export default new EntityStore();

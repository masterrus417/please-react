import { makeAutoObservable } from 'mobx';

import { Entity, getEntity } from '../api/getEntity';
import { getEntityLinks, EntityLink } from '../api/getEntityLinks';
import { updateEntity } from '../api/updateEntity';
import { deleteEntity } from '../api/deleteEntity';
import { deleteEntityLink } from '../api/deleteEntityLink';
import { addEntityLink } from '../api/addEntityLink';

class EntityStore {
	entity?: Entity;
	links: Entity[] = [];
    isLoading: boolean = false;
	isChange: boolean = false;
	state: "loading"|"done"|"error"|"empty" = "empty";
	linksState: "loading"|"type"|"select"|"close" = "close";


    constructor() {
		makeAutoObservable(this);
	}

	getEntityAction = async (entityType: string, entityID: number) => {
		this.setState("loading");
		try {
			const [ cur_entity, cur_entity_links ] = await Promise.all(
			[
				getEntity(entityID),
				getEntityLinks(entityType, entityID)
			]
			);
			if (cur_entity) {
				let links = cur_entity_links.map((ent: EntityLink)=>ent.entity_link[0])
				this.setEntity(cur_entity);
				this.setLinks(links);
				this.setState("done");
			} else {
				this.setState("error");
			}
		} catch {
			this.setState("error");
		}
	}

	reloadLinksAction = () => {
		getEntityLinks(this.entity.rentity_type_name, this.entity.entity_id)
			.then((cur_entity_links)=>{
				let links = cur_entity_links.map((ent: EntityLink)=>ent.entity_link[0]);
				this.setLinks(links);
			})
			.catch(()=>{console.log("Reload links ERROR")});
	}

	addLinkAction = async (entityId:number, linkEntityId: number) => {
		this.setLinksState("loading");
		addEntityLink(entityId, linkEntityId)
			.then(()=>{
				this.reloadLinksAction();
				this.setLinksState("close");
			})
			.catch(()=>{
				this.reloadLinksAction();
				this.setLinksState("close");
			});
	}

	deleteLinkAction = async (entityId:number, linkEntityId: number) => {
		this.setLinksState("loading");
		deleteEntityLink(entityId, linkEntityId)
			.then(()=>{
				this.reloadLinksAction();
				this.setLinksState("close");
			})
			.catch(()=>{
				this.reloadLinksAction();
				this.setLinksState("close");
			});
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
	}

	deleteEntityAction = async (entityId: number) => {
		await deleteEntity(entityId);
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

	setLinksState = (newLinksState) => {
		this.linksState = newLinksState;
	}
}

export default new EntityStore();

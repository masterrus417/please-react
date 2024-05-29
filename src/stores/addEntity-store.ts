import { makeAutoObservable } from 'mobx';
import {Entity} from "./entities-store.ts";



class AddEntity {
    newEntityID: number = null;

    constructor() {
        makeAutoObservable(this);
    }

    setNewEntity(data:Entity[]) {
        console.log(data);
        data.map((item) => {this.newEntityID = item.entity_id});
        return this.newEntityID;
    }
}

const addEntityStore = new AddEntity();
export default addEntityStore;
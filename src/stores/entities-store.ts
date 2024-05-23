import { makeAutoObservable } from 'mobx';


class EntitiesStore {
    entities = [];

    constructor() {
        makeAutoObservable(this);
    }

    setData(newEntities) {
        this.entities = newEntities;
    }
}

const entitiesStore = new EntitiesStore()

export default entitiesStore;
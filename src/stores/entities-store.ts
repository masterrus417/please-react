import { makeAutoObservable } from 'mobx';


class EntitiesStore {
    entities = [];
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setData(newEntities) {
        this.entities = newEntities;
        this.loading = false;
    }

    setLoading() {
        this.loading = true;
    }
}


const entitiesStore = new EntitiesStore()

export default entitiesStore;
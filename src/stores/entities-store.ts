import { makeAutoObservable } from 'mobx';
import { Entity } from '../api/getEntity';
import { getEntities } from '../api/getEntities';


class EntitiesStore {
    entities: Entity[] = [];
    state: "loading"|"done"|"error"|"empty" = "empty";
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    getEntitiesAction = async (entityType: string) => {
        this.setState("loading");
        getEntities(entityType)
            .then((data)=>{
                this.setData(data);
                this.setState("done");
            })
    }

    setData(newEntities: Entity[]) {
        this.entities = newEntities;
        this.loading = false;
    }

    setState(state: "loading"|"done"|"error"|"empty") {
        this.state = state;
    }

    setLoading() {
        this.loading = true;
    }
}

const entitiesStore = new EntitiesStore();

export default entitiesStore
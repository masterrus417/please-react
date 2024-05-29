import { observer } from "mobx-react-lite";
import { useStores } from '../context/root-store-general-context.ts';
import {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import {getEntityByID} from "../api/getEntityByID.tsx";
import {getStageActions} from "../api/getStageActions.tsx";
import EntityCard from "../components/stages/entityCard.tsx";
import {StageActions} from "../types/entityStage.ts";
import {Entity} from "../types/entity.ts";
import {useLocation} from "react-router-dom";

const stageAction: React.FC = observer(({}) => {

    const { state } = useLocation();
    const { Entity } = useStores();
    const { Entities } = useStores();

    const rEntityTypeName = state?.type;
    const entityID = state?.id;

    const [currentActions, setCurrentActions] =
        useState<StageActions[] | null>(null);
    const [currentEntity, setCurrentEntity] =
        useState<Entity | null>(null);

    const getData = async () => {
        const entity = await getEntityByID(state.id);
        const actions = await getStageActions(state.id);
        setCurrentEntity(entity[0]);
        setCurrentActions(actions);
    };

    useEffect(() => {
        getData();
    }, []);

    // useEffect(()=>{
    //     Entity.setLinksState("close");
    //     Entity.getEntityAction(rEntityTypeName, entityID);
    // },[state]);

    // JSX
    return (
        <Grid container spacing={2} style={{padding: '1rem'}}>
            {
                currentEntity != null && currentActions != null ?
                    <Grid item xs={12}>
                        <EntityCard
                            entity={currentEntity}
                            actions={currentActions}
                            getData={getData}
                        />
                    </Grid>

                    : null
            }
        </Grid>
    );
})

export default stageAction;
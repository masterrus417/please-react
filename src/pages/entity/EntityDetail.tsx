import { observer } from "mobx-react-lite";
import { useStores } from '../../context/root-store-general-context';
import { Box, Grid, Typography, Button, Divider } from "@mui/material";
import EntityDetailBody from "../../components/entity/EntityDetailBody";
import LinkCard from "../../components/entity/LinkCard";
import EntityAction from "../../components/entity/EntityAction.tsx";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';


const EntityDetail = observer(() => {

  const [ newLink, setNewLink ] = useState("close");
  

  const { state } = useLocation();
  const rEntityTypeName = state?.type;
  const entityID = state?.id;

  const { Entity } = useStores();
    
  useEffect(()=>{
      setNewLink("close");
      Entity.getEntityAction(rEntityTypeName, entityID);
  },[state]);

  return (
    Entity.entity ? 
      (<>
        {Entity.state === "loading" && (<Box>Получение данных...</Box>)}
        {Entity.state === "done" && (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{m: 2}} variant="h4" component="h1">{Entity.entity.rentity_type_label}</Typography>
                <Divider />
              </Grid>
              <Grid item xs={9}>
                <Box sx={{px: 2, overflowY:"auto" }} height={"70vh"}>
                  <EntityDetailBody entity={Entity.entity}/>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box height={"70vh"}>
                  <Box sx={{ display: "flex"}}>
                    <Typography sx={{mb: 2, ml: 2}} variant="h5" component="h2">Связаные карточки</Typography>
                    <IconButton aria-label="new link" size="small" sx={{m: "0 auto auto auto"}} onClick={()=>setNewLink("type")}>
                      <AddCircleOutlineOutlinedIcon fontSize="inherit" color="action"/>
                    </IconButton>
                  </Box>
                  <Box sx={{ overflowY: "auto"}}>
                    {
                      newLink === "type" && <>
                        <Typography variant="h6">Выберите тип связи</Typography>
                          <Button >Добавить кандидата</Button>
                          <Button>Добавить заявку</Button>
                          <Button onClick={()=>{setNewLink("close")}}>Отмена</Button>
                      </>
                    }
                    {newLink === "close" && !!Entity.links && <Button>Links not found</Button>}
                    <LinkCard attribute={{ entity_id: 40, rentity_type_label: "Заявка", rentity_type_name: "request" }}/>
                    <LinkCard attribute={{ entity_id: 87, rentity_type_label: "Кандидат", rentity_type_name: "candidate" }}/>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <EntityAction
              entityID={entityID}
              rentityTypeName={rEntityTypeName}
              handleDelete={Entity.deleteEntityAction}
              handleSave={Entity.updateEntityAction}
            />
          </Box>
        )}
        {Entity.state === "error" && (<Box>Ошибка загруки</Box>)}</>):
        (
        <Box>
            <Typography>Данных нет</Typography>
        </Box>
        )
  )
});

export default EntityDetail;
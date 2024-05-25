import { observer } from "mobx-react-lite";
import { useStores } from '../../context/root-store-general-context';
import { Box, Grid, Typography, Button, Divider, Stack } from "@mui/material";
import EntityDetailBody from "../../components/entity/EntityDetailBody";
import LinkCard from "../../components/entity/LinkCard";
import EntityAction from "../../components/entity/EntityAction.tsx";
import LinkSelector from "../../components/entity/LinkSelector.tsx";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Alert from '@mui/material/Alert';


const EntityDetail = observer(() => {

  const [ newLink, setNewLink ] = useState("close");
  const [ newLinkType, setNewLinkType ] = useState(null);

  const { state } = useLocation();
  const rEntityTypeName = state?.type;
  const entityID = state?.id;

  const { Entity } = useStores();

  function openLinkSelector(linkType: string) {
    setNewLinkType(linkType);
    setNewLink("select");
  };

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
                    <Stack direction="row">
                      <Typography sx={{mb: 2, ml: 2, mt: 2}} variant="h5" component="h2">Связаные карточки</Typography>
                      <IconButton aria-label="new link" size="large" sx={{ m: "auto auto auto 0"}} onClick={()=>setNewLink("type")}>
                        <AddCircleOutlineOutlinedIcon fontSize="inherit" color="action"/>
                      </IconButton>
                    </Stack>
                  </Box>
                  <Box sx={{ overflowY: "auto"}} height={"70vh"}>
                    {
                      newLink === "type" &&
                      <>
                        <Typography variant="h6">Выберите тип связи</Typography>
                        <Stack sx={{ mx: 2, mt: 2 }} spacing={1}>
                          <Button variant="outlined" onClick={()=>openLinkSelector("candidate")}>Связать с кандидатом</Button>
                          <Button variant="outlined" onClick={()=>openLinkSelector("request")}>Связать с заявкой</Button>
                          <Button sx={{ mt: 2 }} variant="outlined" color="secondary" onClick={()=>setNewLink("close")}>Отмена</Button>
                        </Stack>
                      </>
                    }
                    {newLink === "select" && <LinkSelector linkType={newLinkType}/>}
                    {newLink === "close" && Entity.links.length == 0 && <Alert severity="info">Связи отсутствуют</Alert>}
                    {newLink === "close" && Entity.links.length > 0 && Entity.links.map((ent)=>
                      <LinkCard entity={ent} key={ent.entity_id}/>
                    )}
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
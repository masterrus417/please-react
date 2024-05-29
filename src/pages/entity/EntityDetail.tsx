import { observer } from "mobx-react-lite";
import { useStores } from '../../context/root-store-general-context';
import { Box, Grid, Typography, Button, Divider, Stack, Paper } from "@mui/material";
import EntityDetailBody from "../../components/entity/EntityDetailBody";
import LinkCard from "../../components/entity/LinkCard";
import EntityAction from "../../components/entity/EntityAction.tsx";
import LinkSelector from "../../components/entity/LinkSelector.tsx";
import LinkPlaceholder from "../../components/entity/LinkPlaceholder.tsx";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Alert from '@mui/material/Alert';
import Loader from "../../components/load.tsx";


const EntityDetail = observer(() => {

  const [newLinkType, setNewLinkType] = useState(null);

  const { state } = useLocation();
  const rEntityTypeName = state?.type;
  const entityID = state?.id;

  const { Entity } = useStores();
  const { Entities, SideBar } = useStores();

  function openLinkSelector(linkType: string) {
    setNewLinkType(linkType);
    Entity.setLinksState("select");
  };

  useEffect(() => {
    Entity.setLinksState("close");
    Entity.getEntityAction(rEntityTypeName, entityID);
  }, [state]);

  useEffect(() => {
    let selectedIndex = SideBar.selectedIndex;
    if (Entity.state === "done") {
      if (Entity.entity.rentity_type_name === 'candidate') {
        selectedIndex = 2;
      } else if (Entity.entity.rentity_type_name === 'request') {
        selectedIndex = 3;
      }
    }
    SideBar.setSelectedIndexAction(selectedIndex);
  }, [Entity.state]
  )

  return (
    <>
      {Entity.state === "loading" && (<Loader></Loader>)}
      {Entity.state === "done" && (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item lg={12} sm={12}>
              <Typography sx={{ m: 2 }} variant="h4" component="h1">{Entity.entity.rentity_type_label}</Typography>
              <Divider />
            </Grid>
            <Grid item sm={12} lg={9} >
              <Paper sx={{ height: "75vh", overflowY: "auto" }}>
                <EntityDetailBody entity={Entity.entity} />
              </Paper>
            </Grid>
            <Grid item lg={3} sm={12}>
              <Paper sx={{ height: "75vh" }}>
                <Box sx={{ display: "flex" }}>
                  <Stack direction="row">
                    <Typography sx={{ mb: 2, ml: 2, mt: 2 }} variant="h5" component="h2">Связаные карточки</Typography>
                    <IconButton aria-label="new link" size="large" sx={{ m: "auto auto auto 0" }} onClick={() => Entity.setLinksState("type")}>
                      <AddCircleOutlineOutlinedIcon fontSize="inherit" color="action" />
                    </IconButton>
                  </Stack>
                </Box>
                <Box sx={{ overflowY: "auto" }} height={"65vh"}>
                  {
                    Entity.linksState === "type" &&
                    <>
                      <Typography variant="h6">Выберите тип связи</Typography>
                      <Stack sx={{ mx: 2, mt: 2 }} spacing={1}>
                        <Button variant="outlined" onClick={() => openLinkSelector("candidate")}>Связать с кандидатом</Button>
                        <Button variant="outlined" onClick={() => openLinkSelector("request")}>Связать с заявкой</Button>
                        <Button sx={{ mt: 2 }} variant="outlined" color="secondary" onClick={() => Entity.setLinksState("close")}>Отмена</Button>
                      </Stack>
                    </>
                  }
                  {Entity.linksState === "select" && <LinkSelector entitiesState={Entities.state} setNewLink={Entity.setLinksState} linkType={newLinkType} handleAddEntityLink={Entity.addLinkAction} />}
                  {Entity.linksState === "close" && Entity.links.length == 0 && <Alert severity="info">Связи отсутствуют</Alert>}
                  {Entity.linksState === "close" && Entity.links.length > 0 && Entity.links.map((ent) =>
                    <LinkCard entityId={Entity.entity.entity_id} link={ent} key={ent.entity_id} deleteEntityLink={Entity.deleteLinkAction} />
                  )}
                  {Entity.linksState === "loading" && <LinkPlaceholder />}
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <EntityAction
            entityID={entityID}
            handleDelete={Entity.deleteEntityAction}
            handleSave={Entity.updateEntityAction}
          />
        </Box>
      )}
      {Entity.state === "error" && (<Box>Ошибка загрузки</Box>)}
    </>)


});

export default EntityDetail;
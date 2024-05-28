import { Stack, List, ListItem, Button, Typography, IconButton, Box, Card } from '@mui/material';
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined';
import { useStores } from '../../context/root-store-general-context';
import { useEffect } from 'react';
import { useState } from 'react';
import { getCandidateName, getRequestNumber } from '../../utils/utils';
import LinkPlaceholder from './LinkPlaceholder';


export default function LinkSelector({setNewLink, linkType, entitiesState, handleAddEntityLink}) {
  const { Entity, Entities } = useStores();
  const [ selectorState, setSelectorState] = useState("empty");

  const entityList = Entities.entities.filter(
    (ent)=>(ent.entity_id != Entity.entity.entity_id && (!Entity.links.some((link)=>(link.entity_id == ent.entity_id))))
  );

  useEffect(()=>{
      Entities.getEntitiesAction(linkType);
    }, [linkType]
  );

  useEffect(
    (()=>{setSelectorState(entitiesState)}), [entitiesState]
  );

  return (
    <>
      {selectorState === "loading" && <LinkPlaceholder />}
      {selectorState === "done" &&
        <>
          <Stack>
            <Typography variant="h6" sx={{ mx: 1 }}>Выберите карточку для связи</Typography>
            <List sx={{ overflowY:"auto", maxHeight: "50vh", my: 1 }}>
              {entityList.map((entity)=> {
                return (
                  <Card key={entity.entity_id} sx={{ width: "90%", my: 1, mb: "auto" }}>
                  <ListItem >
                    <Stack direction="row">
                      <IconButton color="primary" onClick={()=>handleAddEntityLink(Entity.entity.entity_id, entity.entity_id)}>
                        <AddLinkOutlinedIcon />
                      </IconButton>
                      <Box>
                        <Typography variant="h6" sx={{ fontSize: 14, mb: 1 }} color="text.secondary">{`${entity.entity_id}-${entity.rentity_type_label}`}</Typography>
                        {entity.rentity_type_name === "candidate" && <Typography variant="h6" sx={{ mt: 1 }}>{`${getCandidateName(entity)}`}</Typography>}
                        {entity.rentity_type_name === "request" && <Typography variant="h6" sx={{ mt: 1 }}>{`№ ${getRequestNumber(entity)}`}</Typography>}
                      </Box>
                    </Stack>
                  </ListItem>
                  </Card>
                )
              })}
            </List>
            <Button variant="outlined" sx={{ mx: 2 }} onClick={()=>setNewLink("close")} color="secondary">Отмена</Button>
          </Stack>
        </>
      }
    </>
  )}
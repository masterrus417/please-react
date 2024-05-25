import { Stack, List, ListItem, Button, Typography, IconButton } from '@mui/material';
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined';


export default function LinkSelector({linkType}) {
  const entityList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <>
      <Stack>
        <Typography variant="h6">Выберите карточку для связи</Typography>
        <List sx={{ overflowY:"auto", maxHeight: "50vh", my: 1 }}>
          {entityList.map((entity)=> {
            return (
              <ListItem key={entity}>
                <Stack direction="row">
                  <IconButton color="primary">
                    <AddLinkOutlinedIcon />
                  </IconButton>                  
                  <Typography variant="h6" sx={{ mt: 1 }}>{`${linkType} ID-${entity}`}</Typography>
                </Stack>
              </ListItem>
            )
          })}
        </List>
        <Button variant="outlined" color="secondary">Отмена</Button>
      </Stack>
    </>
  )}
import { Box, Typography, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import { Entity } from "../../api/getEntity";


type Props = {
  entity: Entity
};

function getCandidateName(ent: Entity) {
  const surnameIndex = ent.entity_attr.findIndex((attr)=>attr.rattr_name=='surname');
  const nameIndex = ent.entity_attr.findIndex((attr)=>attr.rattr_name=='name');
  const patrIndex = ent.entity_attr.findIndex((attr)=>attr.rattr_name=='patronymic');

  const surname = (ent.entity_attr[surnameIndex].entity_attr_value) ? ent.entity_attr[surnameIndex].entity_attr_value : '';
  const name = (ent.entity_attr[nameIndex].entity_attr_value) ? ent.entity_attr[nameIndex].entity_attr_value : '';
  const patr = (ent.entity_attr[patrIndex].entity_attr_value) ? ent.entity_attr[patrIndex].entity_attr_value : '';
  return `${surname} ${name} ${patr}`
};

function getCandidateSpec(ent: Entity) {
  const specIndex = ent.entity_attr.findIndex((attr)=>attr.rattr_name=='speciality');

  const spec = (ent.entity_attr[specIndex].entity_attr_value) ? ent.entity_attr[specIndex].entity_attr_value : '';
  return spec
};

function getRequestNumber(ent: Entity) {
  const numIndex = ent.entity_attr.findIndex((attr)=>attr.rattr_name=='request_no');

  const requestNum = ent.entity_attr[numIndex].entity_attr_value || '';
  return requestNum
};

function getRequestPosName(ent: Entity) {
  const posIndex = ent.entity_attr.findIndex((attr)=>attr.rattr_name=='position_name');

  const posName = ent.entity_attr[posIndex].entity_attr_value || '';
  return posName
};

function getRequestStatus(ent: Entity) {
  const statusIndex = ent.entity_attr.findIndex((attr)=>attr.rattr_name=='status');

  const requestStatus = ent.entity_attr[statusIndex].entity_attr_value || '';
  return requestStatus
};

export default function LinkCard ({entity}: Props) {
  const navigate = useNavigate();

  function openEntity() {
    return navigate("/entity", {state: {type: entity?.rentity_type_name, id: entity?.entity_id}});
  };

  return (
    <Card sx={{ width: "90%", m: 1 }} onDoubleClick={openEntity}>
      <CardContent sx={{ p: 1 }}>
        <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary" gutterBottom>
          {entity?.entity_id} - {entity?.rentity_type_label}
        </Typography>
        {
          entity.rentity_type_name == 'candidate' &&
          <>
            <Typography variant="body1" >
              {getCandidateName(entity)}
            </Typography>
            <Typography variant="caption" >
              {getCandidateSpec(entity)}
            </Typography>
            
          </>
        }
        {
          entity.rentity_type_name == 'request' &&
          <>
            <Typography variant="body1" >
              {getRequestNumber(entity)}
            </Typography>
            <Typography variant="button" >
              {getRequestPosName(entity)}
            </Typography>
            <Typography variant="caption" >
              {getRequestStatus(entity)}
            </Typography>
          </>
        }
 
        <Box sx={{ display: "flex" }}>
          <IconButton aria-label="pageview" size="medium" sx={{ ml: 0, mr: "auto" }} onClick={openEntity}>
            <PageviewOutlinedIcon fontSize="inherit" color="secondary" />
          </IconButton>
          <IconButton aria-label="delete" size="small" sx={{ ml: "auto", mr: "1" }}>
            <DeleteIcon fontSize="inherit" color="warning" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  )
};

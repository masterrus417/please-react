import { Box, Typography, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import { Entity } from "../../api/getEntity";
import { getCandidateName, getCandidateSpec, getRequestNumber, getRequestPosName, getRequestStatus } from "../../utils/utils";



type Props = {
  entityId: number,
  link: Entity,
  deleteEntityLink: Function
};

export default function LinkCard ({entityId, link, deleteEntityLink}: Props) {
  const navigate = useNavigate();

  function openEntity() {
    return navigate("/entity", {state: {type: link?.rentity_type_name, id: link?.entity_id}});
  };

  return (
    <Card sx={{ width: "90%", my: 1, mx: "auto" }} onDoubleClick={openEntity}>
      <CardContent sx={{ p: 1 }}>
        <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary" gutterBottom>
          {link?.entity_id} - {link?.rentity_type_label}
        </Typography>
        {
          link.rentity_type_name == 'candidate' &&
          <>
            <Typography variant="body1" >
              {getCandidateName(link)}
            </Typography>
            <Typography variant="caption" >
              {getCandidateSpec(link)}
            </Typography>
            
          </>
        }
        {
          link.rentity_type_name == 'request' &&
          <>
            <Typography variant="body1" >
              {getRequestNumber(link)}
            </Typography>
            <Typography variant="button" >
              {getRequestPosName(link)}
            </Typography>
            <Typography variant="caption" >
              {getRequestStatus(link)}
            </Typography>
          </>
        }
 
        <Box sx={{ display: "flex" }}>
          <IconButton aria-label="pageview" size="medium" sx={{ ml: 0, mr: "auto" }} onClick={openEntity}>
            <PageviewOutlinedIcon fontSize="inherit" color="secondary" />
          </IconButton>
          <IconButton aria-label="delete" size="small" sx={{ ml: "auto", mr: "1" }} onClick={()=>{deleteEntityLink(entityId, link.entity_id)}}>
            <DeleteIcon fontSize="inherit" color="warning" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  )
};

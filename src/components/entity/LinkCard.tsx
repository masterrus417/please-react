import { Box, Typography, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';

// TODO Для плейсхолдеров. Убрать!!!
type mokAttr = {
  entity_id: number,
  rentity_type_label: "Заявка"|"Кандидат",
  rentity_type_name: "request"|"candidate"
}

type Props = {
  attribute: mokAttr
};

export default function LinkCard ({attribute}: Props) {
  const navigate = useNavigate();

  function openEntity() {
    return navigate("/entity", {state: {type: attribute?.rentity_type_name, id: attribute?.entity_id}});
  };

  return (
    <Card sx={{ width: "90%", m: 1 }} onDoubleClick={openEntity}>
      <CardContent sx={{ p: 1 }}>
        <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary" gutterBottom>
          {attribute?.rentity_type_label}
        </Typography>
        <Typography variant="body1" >
          ID - {attribute?.entity_id}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <IconButton aria-label="pageview" size="small" sx={{ ml: 0, mr: "auto" }} onClick={openEntity}>
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

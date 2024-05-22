import { Box, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Entitys:React.FC = () => {

    const navigate = useNavigate();

    function openEntity() {
        return navigate("/entity", {state: {type: "candidate", id: 83}});
    };

    return(
        <Box display={"flex"} flexDirection={"column"} flexGrow={1}>
            <Typography textAlign={"center"} variant="h4">Кандидаты</Typography>
            <Button onClick={openEntity}>Open entity</Button>
        </Box>
    )
}

export default Entitys;

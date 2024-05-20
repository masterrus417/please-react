
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {
    ButtonGroup,
    Button,
    Container,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Typography,
    Grid,
    TextField,
} from "@mui/material";




// токен для авторизации
const token: string = "token 53f6b053dcd4f7f39471b0910f0e22fcc2fd36d3";
// урла для получения жсона
const url = 'http://92.53.119.132/api/v1/entity';

// тип списка сущностей
type props = {
    rentity_type_name: string;
}


const Entities:React.FC<props> = (props) => {

    // получение типа списка сущностей
    const entityListType = props?.rentity_type_name;

    // инфа для таблицы
    const [tableData, setTableData] = useState([]);
    // открытие диалога для фильтрации
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    // Получаем данные из API
    const getApiData = async () => {

        await fetch(url + '/' + entityListType + '/type', {
            method: 'GET',
            headers: {"Authorization": token}
        })
            .then((res) => res.json())
            .then((data) => setTableData(data))
    }


    useEffect( () => {
        // костыль, переделать на нормальное
        setTableData([]);
        // собираем данные из API
        getApiData();
    }, [entityListType]);


    // открытие диалога для фильтров
    const handleOpenDialog = () => {
        setOpen(true);
    }
    // закрытие диалога для фильтров
    const handleCloseDialog = () => {
        setOpen(false);
    }

    const handleEntityDetailsOpen = (id:number) => {
        return navigate(`/${props?.rentity_type_name}/${id}`, {state: {type: props?.rentity_type_name, id: id}});
    }

    const handleEntityStagesOpen = (id:number) => {
        return navigate(`/${props?.rentity_type_name}/${id}/stage`, {state: {type: props?.rentity_type_name, id: id}});
    }


    return (
        <Container>
            <ButtonGroup>
                <Button onClick={handleOpenDialog}>Фильтрация</Button>
                <Button>Сбросить фильтры</Button>
            </ButtonGroup>

            <Dialog open={open} onClose={handleCloseDialog} fullWidth>
                <DialogTitle>Фильтрация</DialogTitle>
                    {tableData.map((item:any, index:number) => {
                        if (item.entity_id === 41 && entityListType === 'candidate') { // костыль, при одинаковых жсонах убрать условие полностью
                            return (
                                <DialogContent key={index}>
                                    {item.entity_attr.map((item:any, index:number) => {
                                        return (
                                            <Grid item xs={12} key={item.entity_attr_id}>
                                                <Typography key={index}>{item.rattr_label}</Typography>
                                                <TextField className={item.rattr_name} id={item.rattr_name} fullWidth={true} size={"small"} key={item.entity_attr_id}></TextField>
                                            </Grid>
                                        )
                                    })}
                                </DialogContent>
                            )
                        }
                        else if (item.entity_id === 86 && entityListType === 'request') { // костыль, при одинаковых жсонах убрать условие полностью
                           return (
                                <DialogContent key={index}>
                                    {item.entity_attr.map((item:any, index:number) => {
                                        return (
                                            <Grid item xs={12} key={item.entity_attr_id}>
                                                <Typography key={index}>{item.rattr_label}</Typography>
                                                <TextField className={item.rattr_name} id={item.rattr_name} fullWidth={true} size={"small"} key={item.entity_attr_id}></TextField>
                                            </Grid>

                                        )
                                    })}
                                </DialogContent>
                            )
                        }
                    })}
                <DialogActions>
                    <Button color="success" variant="contained">Применить фильтрацию</Button>
                    <Button color="error" variant="contained" onClick={handleCloseDialog}>Отменить</Button>
                </DialogActions>
            </Dialog>

            <TableContainer>
                <Table>
                    <TableHead>
                        {tableData.map((item:any, index:number) => {
                            if (item.entity_id === 41 && entityListType === 'candidate') { // костыль, при одинаковых жсонах убрать условие полностью
                                return (
                                    <TableRow key={index}>
                                        {item.entity_attr.map((item:any, index:number) => {
                                            if (item.rattr_view === true) {return (<TableCell key={index}>{item.rattr_label}</TableCell>)}
                                        })}
                                    </TableRow>
                                )
                            }

                            else if (item.entity_id === 86 && entityListType === 'request') { // костыль, при одинаковых жсонах убрать условие полностью
                                return (
                                    <TableRow key={index}>
                                        {item.entity_attr.map((item:any, index:number) => {
                                            if (item.rattr_view === true) {return (<TableCell key={index}>{item.rattr_label}</TableCell>)}
                                        })}
                                    </TableRow>
                                )
                            }
                        })}
                    </TableHead>

                    <TableBody>
                        {tableData.map((item:any, index:number) => {
                            return (
                                <TableRow key={index}>
                                    {item.entity_attr.map((item:any, index:number) => {
                                        if (item.rattr_view === true) {
                                            return (
                                                <TableCell key={index}>{item.entity_attr_value}</TableCell>
                                            )
                                        }
                                    })}

                                    {item.current_stage.map((item:any, index:number) => {
                                        if (true === true) {
                                            return (
                                                <TableCell key={index}>{item.entity_attr_value}</TableCell>
                                            )
                                        }
                                    })}

                                    <TableCell><Button onClick={() => handleEntityDetailsOpen(item.entity_id)}>Подробнее</Button></TableCell>
                                    <TableCell><Button onClick={() => handleEntityStagesOpen(item.entity_id)}>Этапы</Button></TableCell>

                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default Entities;
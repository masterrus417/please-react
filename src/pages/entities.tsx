
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {
    Button,
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
    TablePagination,
    Paper,
} from "@mui/material";

import {getEntities} from "../api/getEntities.tsx";
import {getFilter} from "../api/getFilters.tsx";
import filterStore from "../stores/filter-store.tsx";
import entitiesStore from "../stores/entities-store.ts";
import paginationStore from "../stores/pagination-store.ts";
import {addEntity} from "../api/addEntity.ts";
import Loader from "../components/load.tsx";


// тип списка сущностей
type props = {
    rentity_type_name: string;
}


const Entities:React.FC<props> = observer((props) => {

    // получение типа списка сущностей
    const entityListType = props.rentity_type_name;

    // Данные для списка сущностей
    const {entities} = entitiesStore;

    // Флаг для загрузки данных
    const {loading} = entitiesStore;

    // Данные для фильтров
    const { filters,
            opened,} = filterStore;

    // Данные для пагинации
    const {page} = paginationStore;
    const {rowsPerPage} = paginationStore;
    const {rowsPerPageOptions} = paginationStore;

    // Навигация для перехода
    const navigate = useNavigate();

    // Следующая страница со строками
    // @ts-ignore
    const handleChangePage = (event, newPage) => {
        paginationStore.setPage(newPage);
    }

    // Выбор количества строк для отображения
    const handleChangeRowsPerPage = (event) => {
        paginationStore.setRowsPerPage(parseInt(event.target.value));
    }

    // Получение данных о сущностях для таблицы
    const getEntitiesData = async () => {
        entitiesStore.setLoading();
        getEntities(props.rentity_type_name)
            .then((entitiesData) => {
                entitiesStore.setData(entitiesData);
            })
        paginationStore.setPage(0);
    }

    // Получение данных о фильтрах
    const getEntitiesFilterData = async () => {
        getFilter(props.rentity_type_name)
            .then((filterEntitiesData) => {
                filterStore.setFilters(filterEntitiesData);
            })
    }


    useEffect( () => {
        getEntitiesData(); // собираем данные о сущностях
        getEntitiesFilterData(); // собираем данные о фильтрах
    }, [entityListType]);


    // открытие диалога для фильтров
    const handleOpenDialog = () => {
        filterStore.setOpenedFilter();
    }

    // закрытие диалога для фильтров
    const handleCloseDialog = () => {
        filterStore.setOpenedFilter();
    }

    // переход на форму для просмотра/редактирования сущности
    const handleEntityDetailsOpen = (id:number) => {
        return navigate(`/${props.rentity_type_name}/${id}`, {state: {type: props.rentity_type_name, id: id}});
    }

    // переход на форму с этапами сущности
    const handleEntityStagesOpen = (id:number) => {
        return navigate(`/${props.rentity_type_name}/${id}/stage`, {state: {type: props.rentity_type_name, id: id}});
    }

    // переход на форму для добавления новой сущности
    const handleEntityNew = () => {
        try {
             addEntity(entityListType)
                .then((id) => {
                    return navigate(`/${props.rentity_type_name}/${id}`, {state: {type: props.rentity_type_name}})
                });
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    // Применение введенного фильтра
    const handleFilterClick = () => {
        entitiesStore.setData(entities);
        // Устанавливаем значения фильтра перед применением
        filterStore.setFilterData(entities);
        entitiesStore.setData(filterStore.filteredData);
        handleCloseDialog();
    }

    // Сброс введенного фильтра
    const handleResetFilters = () => {
        filterStore.resetFilters();
        getEntitiesData();
    }

    // Если это не загрузка данных и данные пустые, то выводим шапку страницы и подписываем что данных нет
    if (!loading && (!entities || entities.length === 0)) {
        return (
            <Paper style={{
                width: 'calc(100% - 16px)',
                marginLeft: '8px',
                marginRight: '8px',
                marginTop: '8px',
                marginBottom: '8px',
            }}>
                <div>
                    <Dialog open={opened} onClose={handleCloseDialog} fullWidth>
                        <DialogTitle>Укажите необходимые данные для фильтрации</DialogTitle>
                            {filters.map((item, index) => {
                                return (
                                    <DialogContent key={index}>
                                        {item.rentity_filter_attr.map((item, index) => {
                                            return (
                                                <Grid item xs={12} key={index}>
                                                    <Typography>{item.rattr_label}</Typography>
                                                    <TextField
                                                        className={item.rattr_name} id={item.rattr_name}
                                                        fullWidth={true} size={"small"}
                                                        key={item.rattr_id}
                                                        onChange={(e) => filterStore.setFilterValue(e.target.value, e.target.id)}
                                                    ></TextField>
                                                </Grid>
                                        )
                                        })}
                                    </DialogContent>
                                )
                            })}
                        <DialogActions>
                            <Button color="success" variant="contained" onClick={handleFilterClick}>Применить фильтрацию</Button>
                            <Button color="error" variant="contained" onClick={handleCloseDialog}>Отменить</Button>
                        </DialogActions>
                    </Dialog>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '10px',
                    }}>
                        <div>
                            <Button onClick={handleOpenDialog}>Фильтрация</Button>
                            <Button onClick={handleResetFilters}>Сбросить фильтры</Button>
                        </div>
                        <Button variant="contained"
                                color="primary"
                                style={{marginLeft: 'auto'}}
                                onClick={handleEntityNew}>
                            Добавить
                        </Button>
                    </div>
                    <Typography style={{paddingLeft: '10px', fontSize: '1.1rem'}}>Данные отсутствуют =(</Typography>
                </div>
            </Paper>
        )
    }

    // В остальных случаях проверяем загрузку и рисуем данные, либо крутилку загрузки
    return (
        !loading ? (
            <Paper style={{
                width: 'calc(100% - 16px)',
                marginLeft: '8px',
                marginRight: '8px',
                marginTop: '8px',
                marginBottom: '8px',
            }}>
                <div>
                    <Dialog open={opened} onClose={handleCloseDialog} fullWidth>
                        <DialogTitle>Укажите необходимые данные для фильтрации</DialogTitle>
                            {filters.map((item, index) => {
                                return (
                                    <DialogContent key={index}>
                                        {item.rentity_filter_attr.map((item, index) => {
                                            return (
                                                <Grid item xs={12} key={index}>
                                                    <Typography>{item.rattr_label}</Typography>
                                                    <TextField
                                                        className={item.rattr_name} id={item.rattr_name}
                                                        fullWidth={true} size={"small"}
                                                        key={item.rattr_id}
                                                        onChange={(e) => filterStore.setFilterValue(e.target.value, e.target.id)}
                                                    ></TextField>
                                                </Grid>
                                        )
                                        })}
                                    </DialogContent>
                                )
                            })}
                        <DialogActions>
                            <Button color="success" variant="contained" onClick={handleFilterClick}>Применить фильтрацию</Button>
                            <Button color="error" variant="contained" onClick={handleCloseDialog}>Отменить</Button>
                        </DialogActions>
                    </Dialog>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '10px',
                    }}>
                        <div>
                            <Button onClick={handleOpenDialog}>Фильтрация</Button>
                            <Button onClick={handleResetFilters}>Сбросить фильтры</Button>
                        </div>
                        <Button variant="contained"
                                color="primary"
                                style={{marginLeft: 'auto'}}
                                onClick={handleEntityNew}>
                            Добавить
                        </Button>
                    </div>

                    <div>
                        <TableContainer style={{maxHeight: '79vh'}}>
                            <Table stickyHeader>
                                <TableHead>

                                    <TableRow>
                                        {entities[0].entity_attr.map((item, index) => {
                                            if (item.rattr_view === true) {
                                                return (<TableCell style={{fontSize: '1rem'}} key={index}>{item.rattr_label}</TableCell>)
                                            }
                                        })}
                                        <TableCell style={{fontSize: '1rem'}}>Текущий этап</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>

                                </TableHead>

                                <TableBody>

                                        {(rowsPerPage > 0
                                                ? entities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                : entities
                                            ).map((item, index) => (

                                                <TableRow key={index}>
                                                    {item.entity_attr.map((item, index) => {
                                                        if (item.rattr_view === true) {
                                                            return (
                                                                <TableCell key={index}>{item.entity_attr_value}</TableCell>
                                                            )
                                                        }
                                                    })}

                                                    <TableCell>
                                                        {item.current_stage.map((item, index) => {
                                                            return (<div key={index}>{item.rstage_label}</div>)
                                                        })}
                                                    </TableCell>
                                                    <TableCell><Button onClick={() => handleEntityDetailsOpen(item.entity_id)}>Подробнее</Button></TableCell>
                                                    <TableCell><Button onClick={() => handleEntityStagesOpen(item.entity_id)}>Этапы</Button></TableCell>

                                                </TableRow>
                                            ))}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                    <div style={{
                        height: '5vh',
                        display: 'flex',
                        justifyContent: 'center',
                        borderBottom: 'none',
                    }}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    {entities.length > 0 && (
                                        <TablePagination
                                            rowsPerPageOptions={rowsPerPageOptions}
                                            colSpan={4}
                                            count={entities.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            labelRowsPerPage="Количество строк" // Меняет "Rows per page" на кастомный
                                            labelDisplayedRows={({ from, to, count}) => `Строки ${from} - ${to} из ${count}`}   // штука меняет дефолтный бар "1-10 of 20" на кастомный, можно даже изменить наполненность
                                        />
                                    )}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </Paper>
        ) : (
            <Paper>
                {Loader(null, null)}
            </Paper>
        )
    );
});

export default Entities;
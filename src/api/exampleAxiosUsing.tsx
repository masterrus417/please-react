import axiosInstance from "./axiosConfig";


//тут определяем типы это пример
interface ExampleData{
    id : number;
    name : string;
//тут остальные параметры
}

//Функции примеры
export const getExportData = async (id:number) =>
	(await axiosInstance.get<ExampleData[]>(`v1/entity/${id}`)).data;
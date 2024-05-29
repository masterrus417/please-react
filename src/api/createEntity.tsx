import axiosInstance from "./axiosConfig";

export const createEntity = async (rentity_type_name: string) =>
    (await axiosInstance.post(`api/v1/entity/${rentity_type_name}/created`)).data[0]
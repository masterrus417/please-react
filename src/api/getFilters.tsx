import axiosInstance from "./axiosConfig.tsx";

export type FilterChoiceValue = {
	rattr_dict_no: number,
	rattr_dict_name: string,
	rattr_dict_label: string
}

export type FilterAttribute = {
	rattr_id: number,
	rattr_name: string,
	rattr_type: string,
	rattr_label: string,
	choice_value: FilterChoiceValue[]
}

export type Filter = {
	rentity_filter_id: number,
	rentity_filter_name: string,
	rentity_filter_label: string,
	rentity_filter_attr: FilterAttribute[]
}


export const getFilter = async (entityType:string) =>
	(await axiosInstance.get<Filter[]>(`/api/v1/filter/${entityType}_list`)).data;


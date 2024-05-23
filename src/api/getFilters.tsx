import axiosInstance from "./axiosConfig.tsx";

export type ChoiceValue = {
	rattr_dict_no : number
	rattr_dict_name : string
	rattr_dict_label : string
}

export type FilterRattrItem = {
	rattr_id: number
	rattr_name : string
	rattr_type : string
	rattr_label : string
	choice_value: ChoiceValue[]
};

export type CustomFilter = {
	rentity_filter_id : number
	rentity_filter_name : string
	rentity_filter_label: string
	rentity_filter_attr: FilterRattrItem[]
};

export const getFilter = async (entityType:string) =>
	(await axiosInstance.get(`v1/filter/${entityType}_list`)).data;


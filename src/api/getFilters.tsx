import axios from 'axios';


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

// export const getFilter = async (rentity_filter_name:string) =>
// 	(await axios.get<CustomFilter[]>(`http://localhost:8000/api/v2/filter/${rentity_filter_name}`)).data;



// токен для авторизации
const token: string = "token 53f6b053dcd4f7f39471b0910f0e22fcc2fd36d3";
// урла для получения жсона
const baseURL = 'http://92.53.119.132/api/v1/filter/';

export async function getFilter(entityType:string) {

	const axiosConfig = {
		method: 'get',
		baseURL: baseURL,
		url: `/${entityType}_list`,
		headers: {'Authorization': token}
	}

	try {
		const response = await axios(axiosConfig)
		return response.data;
	}

	catch (error) {
	};


}
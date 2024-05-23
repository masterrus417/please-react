import axios from 'axios';
import entitiesStore from "../stores/entities-store.ts"; entitiesStore;

export type Posts = {
	id: number
	title: string
	body: string
	userId: number
};

export type entityTypes = {
	entity_attrs: [
		name: string,
		label: string,
		data: any
	]
	entity_id: number

}


// токен для авторизации
const token: string = "token 53f6b053dcd4f7f39471b0910f0e22fcc2fd36d3";
// урла для получения жсона
const baseURL = 'http://92.53.119.132/api/v1/entity/';


export async function getEntities(entityType:string) {

	const axiosConfig = {
		method: 'get',
		baseURL: baseURL,
		url: `/${entityType}/type`,
		headers: {'Authorization': token}
	}

	try {
		const response = await axios(axiosConfig)
		return response.data;
	}
	catch (error) {
	};

}
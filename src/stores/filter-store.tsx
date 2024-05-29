import {makeAutoObservable} from 'mobx';

import { Filter, getFilter } from '../api/getFilters';
import {Entity} from "../stores/entities-store.ts";
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';



class FilterStore {
	filter?: IPromiseBasedObservable<Filter[]>|null;
    isLoading: boolean = false;
	filters: Filter[] = [];
	opened: boolean = false;
	filteredData: Entity[] = [];
	filterValue:string = '';
	filterName:string = '';
	filtered:boolean = false;

    constructor() {
		makeAutoObservable(this);
		this.filterValue = '';
	}


	getFilterAction = (rentity_filter_name:string) => {
		this.filter = fromPromise(getFilter(rentity_filter_name))
	}

	clearFilterAction = () => {
		this.filter = undefined
	}

	setFilters(newFilters) {
		this.filters = newFilters;
	}

	setOpenedFilter() {
		this.opened = !this.opened;
	}

	setFilterData(data:Entity[]) {

		 if (this.filterValue === '') {
			// Если значение фильтра пустое, применить все данные
			this.filteredData = data;
			this.filtered = false;
		} else {
			// Применить фильтр к данным
			this.filteredData = data.filter(entity => {
				// Проверить каждый атрибут сущности на соответствие фильтру
				return entity.entity_attr.some(attr => {
					if (attr.rattr_name !== null && attr.rattr_name === this.filterName && attr.entity_attr_value !== null) {
						return attr.entity_attr_value.includes(this.filterValue);
					}
					return false;
				});
			});
			this.filtered = true;
		}
	}

	setFilterValue(value: string, name: string) {
		this.filterValue = value;
		this.filterName = name;
	}

	    // Метод для сброса фильтров
    resetFilters() {
		// Сбрасываем значения фильтров
		this.filterValue = '';
		this.filterName = '';
		this.filtered = false;
    }

}

const filterStore: FilterStore = new FilterStore();

export default filterStore;
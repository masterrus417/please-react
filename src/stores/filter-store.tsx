import { makeAutoObservable} from 'mobx';

import { Filter, getFilter } from '../api/getFilters';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';



class FilterStore {
	filter?: IPromiseBasedObservable<Filter[]>|null;
    isLoading: boolean = false;
	filters: Filter[] = [];
	opened: boolean = false;

    constructor() {
		makeAutoObservable(this);
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

}

const filterStore: FilterStore = new FilterStore();

export default filterStore;
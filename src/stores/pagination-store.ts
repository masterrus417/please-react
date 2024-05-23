import { makeAutoObservable } from 'mobx';


class PaginationStore {
    rowsPerPageOptions:number[] = [10, 25, 50];
    rowsPerPage:number = 10;
    page:number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setRowsPerPage(newRowsPerPage) {
        this.rowsPerPage = newRowsPerPage;
        this.page = 0;  // преключение на первую станицу при изменении количества строк в таблице
    }

    setPage(newPage) {
        this.page = newPage;
    }
}

const paginationStore = new PaginationStore();

export default paginationStore;
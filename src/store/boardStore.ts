import { makeAutoObservable } from 'mobx';

class BoardStore {
  page = 0;
  category = 'ALL';
  constructor() {
    makeAutoObservable(this);
  }
  setPage = (page: number) => {
    this.page = page;
  };
  setCategory = (category: string) => {
    this.category = category;
    this.page = 0;
  };
  initBoardStore = () => {
    this.category = 'ALL';
    this.page = 0;
  };
}

export const boardStore = new BoardStore();

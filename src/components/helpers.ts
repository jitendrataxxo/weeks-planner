import { BehaviorSubject } from 'rxjs';

export enum STATUS {
  ALL = 'ALL',
  TO_DO = 'TO_DO',
  PROGRESS = 'PROGRESS',
  COMPLETED = 'COMPLETED'
}

const dataList = JSON.parse(localStorage.getItem('data') || '[]');
export const dataList$ = new BehaviorSubject(dataList);
export const allList$ = new BehaviorSubject( dataList.filter((value: any) => (value.status === STATUS.ALL)));
export const todoList$ = new BehaviorSubject(dataList.filter((value: any) => (value.status === STATUS.TO_DO)));
export const progressList$ = new BehaviorSubject(dataList.filter((value: any) => (value.status === STATUS.PROGRESS)));
export const completedList$ = new BehaviorSubject(dataList.filter((value: any) => (value.status === STATUS.COMPLETED)));

export const updateLists = (dataList: Data[]) => {
  dataList$.next(dataList)
  allList$.next(dataList.filter((value: any) => (value.status === STATUS.ALL)))
  todoList$.next(dataList.filter((value: any) => (value.status === STATUS.TO_DO)))
  progressList$.next(dataList.filter((value: any) => (value.status === STATUS.PROGRESS)))
  completedList$.next(dataList.filter((value: any) => (value.status === STATUS.COMPLETED)))
}

export interface Data {
  id?: string;
  subject?: string;
  content?: string;
  date?: string;
  isEdit?: boolean;
  status?: STATUS
}

export const DATA: Data = {
  id: '',
  subject: '',
  content: '',
  date: new Date().toDateString(),
  isEdit: false,
  status: STATUS.ALL,
}
import { createData, deleteData, getAllData, patchData } from './thunksFactory';

export const getHistory = getAllData('history/getHistory', 'history');
export const createHistory = createData('history/createHistory', 'history');
export const patchHistory = patchData('history/patchHistory', 'history');
export const deleteHistory = deleteData('history/deleteHistory', 'history');

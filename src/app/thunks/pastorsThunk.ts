import { createData, deleteData, getAllData, patchData } from './thunksFactory';

export const getPastors = getAllData('pastors/getPastors', 'pastors');
export const createPastor = createData('pastors/createPastor', 'pastors');
export const patchPastor = patchData('pastors/patchPastor', 'pastors');
export const deletePastor = deleteData('pastors/deletePastor', 'pastors');

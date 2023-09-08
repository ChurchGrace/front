import { createData, deleteData, getAllData, patchData } from './thunksFactory';

export const getMinistries = getAllData('ministry/getMinistries', 'ministry');
export const createMinistry = createData('ministry/createMinistry', 'ministry');
export const patchMinistry = patchData('ministry/patchMinistry', 'ministry');
export const deleteMinistry = deleteData('ministry/deleteMinistry', 'ministry');

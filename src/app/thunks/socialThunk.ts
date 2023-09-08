import { createData, deleteData, getAllData, patchData } from './thunksFactory';

export const getSocial = getAllData('social/getSocial', 'social');
export const patchSocial = patchData('social/patchSocial', 'social');
export const createSocial = createData('social/createSocial', 'social');
export const deleteSocial = deleteData('social/deleteSocial', 'social');

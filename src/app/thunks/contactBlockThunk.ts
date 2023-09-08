import { createData, deleteData, getAllData, patchData } from './thunksFactory';

export const getContactBlocks = getAllData('contactBlocks/getContactBlocks', 'contactBlocks');
export const createContactBlock = createData('contactBlocks/createContactBlock', 'contactBlocks');
export const patchContactBlock = patchData('contactBlocks/patchContactBlock', 'contactBlocks');
export const deleteContactBlock = deleteData('contactBlocks/deleteContactBlock', 'contactBlocks');

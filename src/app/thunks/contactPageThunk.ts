import { getOneWithoutId, patchData } from './thunksFactory';

export const getContactPage = getOneWithoutId('contactPage/getContactPage', 'contactPage');
export const patchContactPage = patchData('contactPage/patchContactPage', 'contactPage');

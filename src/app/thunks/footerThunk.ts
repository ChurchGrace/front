import { getOneWithoutId, patchData } from './thunksFactory';

export const getFooter = getOneWithoutId('footer/getFooter', 'footer');
export const patchFooter = patchData('footer/patchFooter', 'footer');

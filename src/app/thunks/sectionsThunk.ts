import { getAllData, patchData } from './thunksFactory';

export const patchSection = patchData('sections/patchSection', 'infoSections');
export const getSections = getAllData('sections/getSections', 'infoSections');

import { getAllData, patchData } from './thunksFactory';

export const patchSlider = patchData('slider/patchSlider', 'slider');
export const getSlider = getAllData('slider/getSlider', 'slider');

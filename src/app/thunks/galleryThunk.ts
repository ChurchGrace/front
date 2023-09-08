import { createData, deleteData, getAllData } from './thunksFactory';

export const getGallery = getAllData('gallery/getGallery', 'gallery');
export const uploadImg = createData('gallery/uploadImg', 'gallery');
export const deleteImg = deleteData('gallery/deleteImg', 'gallery');

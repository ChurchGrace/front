import { createData, deleteData, getAllData, patchData } from './thunksFactory';

export const getEvents = getAllData('events/getEvents', 'time');
export const createEvent = createData('events/createEvent', 'time');
export const patchEvent = patchData('events/patchEvent', 'time');
export const deleteEvent = deleteData('events/deleteEvent', 'time');

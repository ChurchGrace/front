import { createData, deleteData, getAllData, patchData } from './thunksFactory';

export const getPosts = getAllData('posts/getPosts', 'posts');
export const patchPost = patchData('posts/patchPost', 'posts');
export const createPost = createData('posts/createPosts', 'posts');
export const deletePost = deleteData('posts/deletePost', 'posts');

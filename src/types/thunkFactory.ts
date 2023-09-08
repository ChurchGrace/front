import { createPost, deletePost, patchPost } from '../app/thunks/postsThunk';

export interface IDocumentsRes<T> {
  status: string;
  totalPages: number;
  currentPage: number;
  results: number;
  data: {
    documents: T;
  };
}

export interface IDocumentRes<T> {
  status: string;
  data: {
    document: T;
  };
}

interface ITimeEventData {
  time: string;
  event: string;
}

export type TSendData = ITimeEventData | FormData;

export type TGetAllData = undefined | { page?: number; title?: string; url?: string; sort?: string; limit?: number };

export const isDocument = <T>(data: unknown): data is IDocumentRes<T> => {
  return (data as IDocumentRes<T>)?.data?.document !== undefined;
};

export const isDocuments = <T>(data: unknown): data is IDocumentsRes<T> => {
  return (data as IDocumentsRes<T>)?.data?.documents !== undefined;
};

export const isFullError = (error: unknown): error is { message: string } => {
  return (error as { message: string })?.message !== undefined;
};

export type PatchThunk = typeof patchPost;
export type DeleteThunk = typeof deletePost;
export type CreateThunk = typeof createPost;

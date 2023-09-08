/* eslint-disable @typescript-eslint/default-param-last */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { DataApi } from '../api';
import { TGetAllData, TSendData, isDocument, isDocuments, isFullError } from '../../types/thunkFactory';
import { isYouTubePlaylist } from '../../types/youTube';

export const createData = (action: string, endpoint: string) =>
  createAsyncThunk(action, async (SendData: TSendData, { rejectWithValue }) => {
    try {
      const { data } = await new DataApi(endpoint).createOne(SendData);
      if (isDocument(data)) {
        return data.data.document;
      }
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        if (isFullError(e.response?.data)) {
          return rejectWithValue(e.response?.data.message);
        } else {
          return rejectWithValue(e.message);
        }
      }
    }
  });

export const getAllData = (action: string, endpoint: string) =>
  createAsyncThunk(
    action,
    async ({ page = 1, title, url, sort, limit }: TGetAllData = { page: 1 }, { rejectWithValue }) => {
      try {
        const queryTitle = title ? `&title=${title}` : '';
        const queryMinistryUrl = url ? `&url=${url}` : '';
        const querySort = sort ? `&sort=${sort}` : '';
        const queryLimit = limit ? `&limit=${limit}` : '';
        const queryString = `page=${page}${queryTitle}${queryMinistryUrl}${querySort}${queryLimit}`;
        const { data } = await new DataApi(endpoint).getAll(queryString);
        if (isDocuments(data)) {
          return data;
        }
      } catch (e: unknown) {
        if (isAxiosError(e)) {
          if (isFullError(e.response?.data)) {
            return rejectWithValue(e.response?.data.message);
          } else {
            return rejectWithValue(e.message);
          }
        }
      }
    },
  );

export const getAllVideos = (action: string) =>
  createAsyncThunk(
    action,
    async ({ page, maxResults }: { page?: string; maxResults?: number } | undefined = {}, { rejectWithValue }) => {
      const maxResultsQuery = maxResults ? `maxResults=${maxResults}` : 'maxResults=6';
      const pageTokenQuery = page ? `&pageToken=${page}` : '';
      const queryStr = `${maxResultsQuery}${pageTokenQuery}`;
      try {
        const { data } = await new DataApi('').getVideos(queryStr);
        if (isYouTubePlaylist(data)) {
          return data;
        }
      } catch (e: unknown) {
        if (isAxiosError(e)) {
          if (isFullError(e.response?.data)) {
            return rejectWithValue(e.response?.data.message);
          } else {
            return rejectWithValue(e.message);
          }
        }
      }
    },
  );

export const getOne = (action: string, endpoint: string) =>
  createAsyncThunk(action, async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await new DataApi(endpoint).getOne(id);
      if (isDocument(data)) {
        return data;
      }
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        if (isFullError(e.response?.data)) {
          return rejectWithValue(e.response?.data.message);
        } else {
          return rejectWithValue({
            id,
            message: e.message,
          });
        }
      }
    }
  });

export const getOneWithoutId = (action: string, endpoint: string) =>
  createAsyncThunk(action, async (_, { rejectWithValue }) => {
    try {
      const { data } = await new DataApi(endpoint).getOne();
      if (isDocument(data)) {
        return data;
      }
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        if (isFullError(e.response?.data)) {
          return rejectWithValue(e.response?.data.message);
        } else {
          return rejectWithValue(e.message);
        }
      }
    }
  });

export const patchData = (action: string, endpoint: string) =>
  createAsyncThunk(action, async ({ sendData, id }: { sendData: TSendData; id: string }, { rejectWithValue }) => {
    try {
      const { data } = await new DataApi(endpoint).patchOne(id, sendData);
      if (isDocument(data)) {
        return data.data.document;
      }
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        if (isFullError(e.response?.data)) {
          return rejectWithValue({
            id,
            message: e.response?.data.message,
          });
        } else {
          return rejectWithValue({
            id,
            message: e.message,
          });
        }
      }
    }
  });

export const deleteData = (action: string, endpoint: string) =>
  createAsyncThunk(action, async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await new DataApi(endpoint).deleteOne(id);
      if (isDocument(data)) {
        return data.data.document;
      }
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        if (isFullError(e.response?.data)) {
          return rejectWithValue({
            id,
            message: e.response?.data.message,
          });
        } else {
          return rejectWithValue({
            id,
            message: e.message,
          });
        }
      }
    }
  });

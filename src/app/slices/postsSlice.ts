import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { createPost, deletePost, getPosts, patchPost } from '../thunks/postsThunk';
import { RootState } from '../store';
import { IPost, isPost } from '../../types/posts';
import { StatusEnum } from '../../types/shared';
import { isDocuments } from '../../types/thunkFactory';

const postsAdapter = createEntityAdapter<IPost>({
  selectId: (data) => data._id,
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState({
    postsStatus: StatusEnum.LOADING,
    createPostStatus: StatusEnum.LOADED,
    postsError: '',
    totalPages: 1,
    btnsStatus: false,
  }),
  reducers: {
    updatePostStatus: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.btnsStatus = true;
      postsAdapter.updateOne(state, { id: payload.id, changes: { itemStatus: StatusEnum.LOADING } });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.postsStatus = StatusEnum.LOADING;
    });
    builder.addCase(getPosts.fulfilled, (state, { payload }) => {
      if (isDocuments<IPost[]>(payload)) {
        postsAdapter.setAll(state, payload.data.documents);
        state.totalPages = payload.totalPages;
      }
      state.postsStatus = StatusEnum.LOADED;
    });
    builder.addCase(getPosts.rejected, (state) => {
      state.postsStatus = StatusEnum.ERROR;
    });
    builder.addCase(createPost.pending, (state) => {
      state.createPostStatus = StatusEnum.LOADING;
    });
    builder.addCase(createPost.fulfilled, (state, { payload }) => {
      state.createPostStatus = StatusEnum.LOADED;
      if (isPost(payload)) {
        postsAdapter.setOne(state, payload);
      }
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.createPostStatus = StatusEnum.ERROR;
      if (typeof action.payload === 'string') {
        state.postsError = action.payload;
      }
    });
    builder.addCase(patchPost.fulfilled, (state, { payload }) => {
      if (isPost(payload)) {
        postsAdapter.setOne(state, { ...payload, itemStatus: StatusEnum.LOADED });
      }
      state.btnsStatus = false;
    });
    builder.addCase(patchPost.rejected, (state, { payload }) => {
      const { id, message } = payload as { message: string; id: string };
      postsAdapter.updateOne(state, { id, changes: { itemStatus: StatusEnum.ERROR } });
      state.postsError = message;
      state.btnsStatus = false;
    });
    builder.addCase(deletePost.fulfilled, (state, { payload }) => {
      if (isPost(payload)) {
        postsAdapter.removeOne(state, payload?._id);
      }
      state.btnsStatus = false;
    });
    builder.addCase(deletePost.rejected, (state, { payload }) => {
      const { message, id } = payload as { message: string; id: string };
      postsAdapter.updateOne(state, { id, changes: { itemStatus: StatusEnum.ERROR } });
      if (typeof message === 'string') {
        state.postsError = message;
      }
      state.btnsStatus = false;
    });
  },
});

export const { updatePostStatus } = postsSlice.actions;
export default postsSlice.reducer;

export const { selectAll: selectPosts } = postsAdapter.getSelectors((state: RootState) => state.posts);

export const selectPostStatus = (state: RootState) => state.posts.postsStatus;
export const selectCreatePostStatus = (state: RootState) => state.posts.createPostStatus;
export const selectPostsError = (state: RootState) => state.posts.postsError;
export const selectPostPages = (state: RootState) => state.posts.totalPages;
export const selectPostBtnsStatus = (state: RootState) => state.posts.btnsStatus;

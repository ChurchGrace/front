import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { StatusEnum } from '../../types/shared';
import { IContactPage, isContactPage } from '../../types/contactPage';
import { getContactPage, patchContactPage } from '../thunks/contactPageThunk';
import { isDocument } from '../../types/thunkFactory';

const contactPageAdapter = createEntityAdapter<IContactPage>({
  selectId: (data) => data._id,
});

export const sectionsSlice = createSlice({
  name: 'contactPage',
  initialState: contactPageAdapter.getInitialState({
    contactPageStatus: StatusEnum.LOADING,
    contactPageError: '',
  }),
  reducers: {
    updateContactPageStatus: (state, { payload }: PayloadAction<{ id: string }>) => {
      contactPageAdapter.updateOne(state, { id: payload.id, changes: { itemStatus: StatusEnum.LOADING } });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getContactPage.pending, (state) => {
      state.contactPageStatus = StatusEnum.LOADING;
    });
    builder.addCase(getContactPage.fulfilled, (state, { payload }) => {
      if (isDocument<IContactPage>(payload)) {
        contactPageAdapter.setOne(state, payload.data.document);
      }
      state.contactPageStatus = StatusEnum.LOADED;
    });
    builder.addCase(getContactPage.rejected, (state) => {
      state.contactPageStatus = StatusEnum.ERROR;
    });
    builder.addCase(patchContactPage.fulfilled, (state, { payload }) => {
      if (isContactPage(payload)) {
        contactPageAdapter.setOne(state, { ...payload, itemStatus: StatusEnum.LOADED });
      }
    });
    builder.addCase(patchContactPage.rejected, (state, { payload }) => {
      const { id, message } = payload as { message: string; id: string };
      contactPageAdapter.updateOne(state, { id, changes: { itemStatus: StatusEnum.ERROR } });
      state.contactPageError = message;
    });
  },
});

export const { updateContactPageStatus } = sectionsSlice.actions;
export default sectionsSlice.reducer;

export const { selectAll: selectContactPage } = contactPageAdapter.getSelectors(
  (state: RootState) => state.contactPage,
);
export const selectContactPageStatus = (state: RootState) => state.contactPage.contactPageStatus;
export const selectContactPageError = (state: RootState) => state.contactPage.contactPageError;

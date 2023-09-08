import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { StatusEnum } from '../../types/shared';
import { ISection, isSection } from '../../types/sections';
import { getSections, patchSection } from '../thunks/sectionsThunk';
import { isDocuments } from '../../types/thunkFactory';

const sectionsAdapter = createEntityAdapter<ISection>({
  selectId: (data) => data._id,
});

export const sectionsSlice = createSlice({
  name: 'sections',
  initialState: sectionsAdapter.getInitialState({
    sectionsStatus: StatusEnum.LOADING,
    sectionsError: '',
  }),
  reducers: {
    updateSectionStatus: (state, { payload }: PayloadAction<{ id: string }>) => {
      sectionsAdapter.updateOne(state, { id: payload.id, changes: { itemStatus: StatusEnum.LOADING } });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSections.pending, (state) => {
      state.sectionsStatus = StatusEnum.LOADING;
    });
    builder.addCase(getSections.fulfilled, (state, { payload }) => {
      if (isDocuments<ISection[]>(payload)) {
        sectionsAdapter.setAll(state, payload.data.documents);
      }
      state.sectionsStatus = StatusEnum.LOADED;
    });
    builder.addCase(getSections.rejected, (state) => {
      state.sectionsStatus = StatusEnum.ERROR;
    });

    builder.addCase(patchSection.fulfilled, (state, { payload }) => {
      if (isSection(payload)) {
        sectionsAdapter.setOne(state, { ...payload, itemStatus: StatusEnum.LOADED });
      }
    });
    builder.addCase(patchSection.rejected, (state, { payload }) => {
      const { id, message } = payload as { message: string; id: string };
      sectionsAdapter.updateOne(state, { id, changes: { itemStatus: StatusEnum.ERROR } });
      state.sectionsError = message;
    });
  },
});

export const { updateSectionStatus } = sectionsSlice.actions;
export default sectionsSlice.reducer;

export const { selectAll: selectSections } = sectionsAdapter.getSelectors((state: RootState) => state.sections);
export const selectSectionsStatus = (state: RootState) => state.sections.sectionsStatus;
export const selectSectionsError = (state: RootState) => state.sections.sectionsError;

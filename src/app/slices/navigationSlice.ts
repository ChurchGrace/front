import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { StatusEnum } from '../../types/shared';
import { isDocuments } from '../../types/thunkFactory';
import { INavigation } from '../../types/navigation';
import { getNavigation } from '../thunks/navigationThunk';

const navigationAdapter = createEntityAdapter<INavigation>({
  selectId: (data) => data._id,
});

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: navigationAdapter.getInitialState({
    navigationStatus: StatusEnum.LOADING,
    navigationError: '',
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNavigation.pending, (state) => {
      state.navigationStatus = StatusEnum.LOADING;
    });
    builder.addCase(getNavigation.fulfilled, (state, { payload }) => {
      if (isDocuments<INavigation[]>(payload)) {
        const documents = payload.data.documents.map((nav) => {
          if (nav.title === 'Служение') {
            return { ...nav, className: 'Services' };
          }
          if (nav.title === 'О Церкви') {
            return { ...nav, className: 'About' };
          }
          return nav;
        });
        navigationAdapter.setAll(state, documents);
      }
      state.navigationStatus = StatusEnum.LOADED;
    });
    builder.addCase(getNavigation.rejected, (state) => {
      state.navigationStatus = StatusEnum.ERROR;
    });
  },
});

export default navigationSlice.reducer;

export const { selectAll: selectNavigation } = navigationAdapter.getSelectors((state: RootState) => state.navigation);

export const selectNavigationStatus = (state: RootState) => state.navigation.navigationStatus;
export const selectNavigationError = (state: RootState) => state.navigation.navigationError;

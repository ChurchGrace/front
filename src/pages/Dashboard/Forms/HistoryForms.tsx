import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { PaginationStyled } from '../../BlogPage/BlogPageStyled';
import { showFormContent } from '../../../utils/dashboard';
import { FormEditorStyled } from '../DashboardStyled';
import {
  selectCreateHistoryStatus,
  selectHistory,
  selectHistoryBtnsStatus,
  selectHistoryError,
  selectHistoryPages,
  selectHistoryStatus,
  updateHistoryStatus,
} from '../../../app/slices/historySlice';
import { createHistory, deleteHistory, getHistory, patchHistory } from '../../../app/thunks/historyThunk';
import { WithStandartCreateForm } from '../../../components/Forms/CreateFormGeneral';
import { WithStandartEditForm } from '../../../components/Forms/EditFormGeneral';

const HistoryForms = () => {
  const [page, setPage] = useState(1);
  const history = useAppSelector(selectHistory);
  const formsStatus = useAppSelector(selectHistoryStatus);
  const createStatus = useAppSelector(selectCreateHistoryStatus);
  const btnsStatus = useAppSelector(selectHistoryBtnsStatus);
  const formError = useAppSelector(selectHistoryError);
  const pages = useAppSelector(selectHistoryPages);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  useEffect(() => {
    void dispatch(getHistory({ page, limit: 6 }));
  }, [dispatch, page]);

  return (
    <>
      {showFormContent(
        formsStatus,
        <FormEditorStyled>
          <WithStandartCreateForm
            formStatus={createStatus}
            formError={formError}
            createThunk={createHistory}
            showImg={[{ imgName: 'Фото', inputName: 'imgMain', optional: true }]}
          />
          {history.length &&
            history.map((historyItem) => {
              return (
                <WithStandartEditForm
                  btnsStatus={btnsStatus}
                  changeStatus={updateHistoryStatus}
                  patchThunk={patchHistory}
                  deleteThunk={deleteHistory}
                  formError={formError}
                  textItem={historyItem.text}
                  titleItem={historyItem.title}
                  itemStatus={historyItem.itemStatus}
                  id={historyItem._id}
                  key={historyItem._id}
                  showImg={[
                    {
                      imgName: 'Фото',
                      inputName: 'imgMain',
                      url: historyItem?.imgMain?.url,
                      img: historyItem?.imgMain?.img,
                    },
                  ]}
                />
              );
            })}
          {pages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '30px' }}>
              <PaginationStyled count={pages} page={page} onChange={handleChange} />
            </div>
          )}
        </FormEditorStyled>,
      )}
    </>
  );
};

export default HistoryForms;

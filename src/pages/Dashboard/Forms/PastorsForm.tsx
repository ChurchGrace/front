import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { PaginationStyled } from '../../BlogPage/BlogPageStyled';
import { showFormContent } from '../../../utils/dashboard';
import { FormEditorStyled } from '../DashboardStyled';
import {
  selectCreatePastorStatus,
  selectPastors,
  selectPastorsBtnsStatus,
  selectPastorsError,
  selectPastorsPages,
  selectPastorsStatus,
  setPastorsPhotosError,
  updatePastorStatus,
} from '../../../app/slices/pastorsSlice';
import { createPastor, deletePastor, getPastors, patchPastor } from '../../../app/thunks/pastorsThunk';
import { WithPastorsEditForm } from '../../../components/Forms/EditFormGeneral';
import { WithPastorsCreateForm } from '../../../components/Forms/CreateFormGeneral';

const PastorsForms = () => {
  const [page, setPage] = useState(1);
  const pastors = useAppSelector(selectPastors);
  const formsStatus = useAppSelector(selectPastorsStatus);
  const createStatus = useAppSelector(selectCreatePastorStatus);
  const btnsStatus = useAppSelector(selectPastorsBtnsStatus);
  const formError = useAppSelector(selectPastorsError);
  const pages = useAppSelector(selectPastorsPages);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    void dispatch(getPastors({ page, limit: 6 }));
  }, [dispatch, page]);

  return (
    <>
      {showFormContent(
        formsStatus,
        <FormEditorStyled>
          <WithPastorsCreateForm
            photoErrorAction={setPastorsPhotosError}
            formError={formError}
            createThunk={createPastor}
            formStatus={createStatus}
            showImg={[{ imgName: 'Фото', inputName: 'imgMain' }]}
          />
          {pastors.length &&
            pastors.map((pastor) => {
              return (
                <WithPastorsEditForm
                  changeStatus={updatePastorStatus}
                  btnsStatus={btnsStatus}
                  patchThunk={patchPastor}
                  deleteThunk={deletePastor}
                  formError={formError}
                  nameFiled={pastor.name}
                  surname={pastor.surname}
                  job={pastor.job}
                  itemStatus={pastor.itemStatus}
                  id={pastor._id}
                  key={pastor._id}
                  showImg={[
                    {
                      imgName: 'Фото',
                      inputName: 'imgMain',
                      url: pastor?.imgMain?.url,
                      img: pastor?.imgMain?.img,
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

export default PastorsForms;

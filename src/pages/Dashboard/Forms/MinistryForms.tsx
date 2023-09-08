import { useEffect, useState } from 'react';
import { createMinistry, deleteMinistry, getMinistries, patchMinistry } from '../../../app/thunks/ministryThunk';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectCreateMinistryStatus,
  selectMinistries,
  selectMinistriesStatus,
  selectMinistryBtnsStatus,
  selectMinistryError,
  selectMinistryPages,
  setMinistryPhotosError,
  updateMinistrySatus,
} from '../../../app/slices/ministrySlice';
import { PaginationStyled } from '../../BlogPage/BlogPageStyled';
import { FormEditorStyled } from '../DashboardStyled';
import { showFormContent } from '../../../utils/dashboard';
import { WithStandartCreateForm } from '../../../components/Forms/CreateFormGeneral';
import { WithStandartEditForm } from '../../../components/Forms/EditFormGeneral';
import { IMinistry } from '../../../types/ministry';

const MinistryForm = () => {
  const [page, setPage] = useState(1);
  const ministries = useAppSelector(selectMinistries);
  const formsStatus = useAppSelector(selectMinistriesStatus);
  const createStatus = useAppSelector(selectCreateMinistryStatus);
  const btnsStatus = useAppSelector(selectMinistryBtnsStatus);
  const formError = useAppSelector(selectMinistryError);
  const pages = useAppSelector(selectMinistryPages);
  const dispatch = useAppDispatch();

  const transformMinistryImgs = (ministry: IMinistry) => {
    const imgs = ministry.imgs.map((img) => {
      return { ...img, imgName: 'Доп фото', inputName: 'imgs' as const };
    });

    return [
      {
        imgName: 'Фото',
        inputName: 'imgMain',
        url: ministry?.imgMain?.url,
        img: ministry?.imgMain?.img,
      } as const,
      {
        imgName: 'Бэграунд',
        inputName: 'imgCover',
        url: ministry?.imgCover?.url,
        img: ministry?.imgCover?.img,
      } as const,
      ...imgs,
    ];
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    void dispatch(getMinistries({ page, limit: 6 }));
  }, [dispatch, page]);

  return (
    <>
      {showFormContent(
        formsStatus,
        <FormEditorStyled>
          <WithStandartCreateForm
            photoErrorAction={setMinistryPhotosError}
            formStatus={createStatus}
            formError={formError}
            createThunk={createMinistry}
            showImg={[
              { imgName: 'Фото', inputName: 'imgMain' },
              { imgName: 'Бэграунд', inputName: 'imgCover' },
              { imgName: 'Доп Фото', inputName: 'imgs' },
            ]}
          />
          {ministries.length &&
            ministries.map((ministry) => {
              return (
                <WithStandartEditForm
                  btnsStatus={btnsStatus}
                  changeStatus={updateMinistrySatus}
                  patchThunk={patchMinistry}
                  deleteThunk={deleteMinistry}
                  formError={formError}
                  textItem={ministry.text}
                  titleItem={ministry.title}
                  itemStatus={ministry.itemStatus}
                  id={ministry._id}
                  key={ministry._id}
                  showImg={transformMinistryImgs(ministry)}
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

export default MinistryForm;

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectCreateSocialStatus,
  selectSocial,
  selectSocialBtnsStatus,
  selectSocialError,
  selectSocialPages,
  selectSocialStatus,
  setSocialPhotosError,
  updateSocialStatus,
} from '../../../app/slices/socialSlice';
import { PaginationStyled } from '../../BlogPage/BlogPageStyled';
import { showFormContent } from '../../../utils/dashboard';
import { FormEditorStyled } from '../DashboardStyled';
import { WithStandartCreateForm } from '../../../components/Forms/CreateFormGeneral';
import { WithSocialEditForm } from '../../../components/Forms/EditFormGeneral';
import { createSocial, deleteSocial, getSocial, patchSocial } from '../../../app/thunks/socialThunk';

const SocialForms = () => {
  const [page, setPage] = useState(1);
  const social = useAppSelector(selectSocial);
  const formsStatus = useAppSelector(selectSocialStatus);
  const createStatus = useAppSelector(selectCreateSocialStatus);
  const btnsStatus = useAppSelector(selectSocialBtnsStatus);
  const formError = useAppSelector(selectSocialError);
  const pages = useAppSelector(selectSocialPages);
  const dispatch = useAppDispatch();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    void dispatch(getSocial({ page, limit: 6 }));
  }, [dispatch, page]);

  return (
    <>
      {showFormContent(
        formsStatus,
        <FormEditorStyled>
          <WithStandartCreateForm
            isSocial
            formStatus={createStatus}
            formError={formError}
            createThunk={createSocial}
            photoErrorAction={setSocialPhotosError}
            showImg={[
              {
                imgName: 'Фото',
                inputName: 'imgMain',
              },
            ]}
          />
          {social.length &&
            social.map((socialItem) => {
              return (
                <WithSocialEditForm
                  btnsStatus={btnsStatus}
                  changeStatus={updateSocialStatus}
                  patchThunk={patchSocial}
                  deleteThunk={deleteSocial}
                  formError={formError}
                  titleItem={socialItem.title}
                  urlItem={socialItem.url}
                  itemStatus={socialItem.itemStatus}
                  id={socialItem._id}
                  key={socialItem._id}
                  showImg={[
                    {
                      imgName: 'Фото',
                      inputName: 'imgMain',
                      url: socialItem?.imgMain?.url,
                      img: socialItem?.imgMain?.img,
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

export default SocialForms;

import { useEffect, useMemo, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
  FormEditorImgStyled,
  FormEditorImgWrapperStyled,
  FormEditorStyled,
  GalleryPhotosStyled,
} from '../DashboardStyled';
import { showFormContent } from '../../../utils/dashboard';
import {
  selectGallery,
  selectGalleryBtnsStatus,
  selectGalleryError,
  selectGalleryPages,
  selectGalleryStatus,
  selectUploadImgStatus,
  setGalleryPhotosError,
  updateImgStatus,
} from '../../../app/slices/gallerySlice';
import { deleteImg, getGallery, uploadImg } from '../../../app/thunks/galleryThunk';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ButtonWrapper } from '../../GalleryPage/GalleryPageStyled';
import { ButtonStyled } from '../../../components/Shared';
import { UploadImgComponent } from '../../../components/Forms/UploadImg';
import FormButtons from '../../../components/Forms/FormControll';

const GalleryForm = () => {
  const [page, setPage] = useState(1);
  const formData = useMemo(() => new FormData(), []);
  const gallery = useAppSelector(selectGallery);
  const formsStatus = useAppSelector(selectGalleryStatus);
  const createStatus = useAppSelector(selectUploadImgStatus);
  const formError = useAppSelector(selectGalleryError);
  const btnsStatus = useAppSelector(selectGalleryBtnsStatus);
  const pages = useAppSelector(selectGalleryPages);
  const dispatch = useAppDispatch();

  const handleChange = () => {
    setPage((prevPage) => prevPage + 1);
  };
  useEffect(() => {
    void dispatch(getGallery({ page, limit: 10 }));
  }, [dispatch, page]);

  const onClickDeleteImg = (id: string) => {
    dispatch(updateImgStatus({ id }));
    void dispatch(deleteImg(id));
  };

  const onClickCreateImg = () => {
    if (!formData.has('imgMain')) {
      dispatch(setGalleryPhotosError());
    } else {
      void dispatch(uploadImg(formData));
    }
  };

  return (
    <>
      {showFormContent(
        formsStatus,
        <FormEditorStyled>
          <FormEditorImgWrapperStyled>
            <UploadImgComponent
              isCancel
              formData={formData}
              imgName='Фото'
              inputName='imgMain'
              itemStatus={createStatus}
            />
          </FormEditorImgWrapperStyled>
          <FormButtons saveFn={onClickCreateImg} formError={formError} formStatus={createStatus} />

          <GalleryPhotosStyled>
            {gallery.map((galleryItem) => {
              return (
                <div key={galleryItem._id}>
                  <FormEditorImgWrapperStyled>
                    <FormEditorImgStyled>
                      <LazyLoadImage src={galleryItem.imgMain?.url} effect='blur' />
                    </FormEditorImgStyled>
                  </FormEditorImgWrapperStyled>
                  <FormButtons
                    formError={formError}
                    btnsStatus={btnsStatus}
                    formStatus={galleryItem?.itemStatus}
                    deleteFn={() => onClickDeleteImg(galleryItem._id)}
                  />
                </div>
              );
            })}
          </GalleryPhotosStyled>
          {pages !== page && (
            <ButtonWrapper>
              <ButtonStyled style={{ marginBottom: '40px' }} onClick={handleChange} size='large' variant='contained'>
                Загрузить еще
              </ButtonStyled>
            </ButtonWrapper>
          )}
        </FormEditorStyled>,
      )}
    </>
  );
};

export default GalleryForm;

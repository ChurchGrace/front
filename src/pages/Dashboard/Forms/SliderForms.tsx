import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { showFormContent } from '../../../utils/dashboard';
import { FormEditorStyled } from '../DashboardStyled';
import {
  selectSliderError,
  selectSliderStatus,
  selectSlides,
  updateSlideStatus,
} from '../../../app/slices/sliderSlice';
import { getSlider, patchSlider } from '../../../app/thunks/sliderThunk';
import { WithSliderEditForm } from '../../../components/Forms/EditFormGeneral';

const SliderForms = () => {
  const slides = useAppSelector(selectSlides);
  const formsStatus = useAppSelector(selectSliderStatus);
  const formError = useAppSelector(selectSliderError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getSlider());
  }, [dispatch]);

  return (
    <>
      {showFormContent(
        formsStatus,
        <FormEditorStyled>
          {slides.map((slide) => {
            return (
              <WithSliderEditForm
                changeStatus={updateSlideStatus}
                patchThunk={patchSlider}
                formError={formError}
                titleItem={slide.title}
                textItem={slide.text}
                subTitleItem={slide.subtitle}
                itemStatus={slide.itemStatus}
                id={slide._id}
                showImg={[
                  {
                    imgName: 'Иконка',
                    inputName: 'imgMain',
                    url: slide?.imgMain?.url,
                    img: slide?.imgMain?.img,
                  },
                  {
                    imgName: 'Фото Слайда',
                    inputName: 'imgCover',
                    url: slide?.imgCover?.url,
                    img: slide?.imgCover?.img,
                  },
                ]}
                key={slide._id}
              />
            );
          })}
        </FormEditorStyled>,
      )}
    </>
  );
};

export default SliderForms;

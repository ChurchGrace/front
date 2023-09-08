import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { showFormContent } from '../../../utils/dashboard';
import { FormEditorStyled } from '../DashboardStyled';
import {
  selectSections,
  selectSectionsError,
  selectSectionsStatus,
  updateSectionStatus,
} from '../../../app/slices/sectionsSlice';
import { getSections, patchSection } from '../../../app/thunks/sectionsThunk';
import { WithInfoEditForm } from '../../../components/Forms/EditFormGeneral';

const SectionsForms = () => {
  const infoSections = useAppSelector(selectSections);
  const formsStatus = useAppSelector(selectSectionsStatus);
  const formError = useAppSelector(selectSectionsError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getSections());
  }, [dispatch]);

  return (
    <>
      {showFormContent(
        formsStatus,
        <FormEditorStyled>
          {infoSections.length &&
            infoSections.map((infoSection) => {
              return (
                <WithInfoEditForm
                  changeStatus={updateSectionStatus}
                  patchThunk={patchSection}
                  formError={formError}
                  titleItem={infoSection.title}
                  textItem={infoSection.text}
                  subTitleItem={infoSection.subtitle}
                  textBtnItem={infoSection.textBtn}
                  itemStatus={infoSection.itemStatus}
                  id={infoSection._id}
                  key={infoSection._id}
                  showImg={[
                    {
                      imgName: 'Фото Секции',
                      inputName: 'imgCover',
                      url: infoSection?.imgCover?.url,
                      img: infoSection?.imgCover?.img,
                    },
                  ]}
                />
              );
            })}
        </FormEditorStyled>,
      )}
    </>
  );
};

export default SectionsForms;

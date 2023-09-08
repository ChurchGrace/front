import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { showFormContent } from '../../../utils/dashboard';
import { FormEditorStyled } from '../DashboardStyled';
import {
  selectFooter,
  selectFooterError,
  selectFooterStatus,
  updateFooterStatus,
} from '../../../app/slices/footerSlice';
import { WithFooterEditForm } from '../../../components/Forms/EditFormGeneral';
import { getFooter, patchFooter } from '../../../app/thunks/footerThunk';

const FooterForms = () => {
  const footer = useAppSelector(selectFooter);
  const formsStatus = useAppSelector(selectFooterStatus);
  const formError = useAppSelector(selectFooterError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getFooter());
  }, [dispatch]);

  return (
    <>
      {showFormContent(
        formsStatus,
        <FormEditorStyled>
          {footer.map((footerItem) => {
            return (
              <WithFooterEditForm
                changeStatus={updateFooterStatus}
                patchThunk={patchFooter}
                formError={formError}
                titleItem={footerItem.title}
                textItem={footerItem.text}
                bottomTextItem={footerItem.bottomText}
                itemStatus={footerItem.itemStatus}
                id={footerItem._id}
                key={footerItem._id}
                showImg={[
                  {
                    imgName: 'Фото подвала',
                    inputName: 'imgCover',
                    url: footerItem?.imgCover?.url,
                    img: footerItem?.imgCover?.img,
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

export default FooterForms;

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { showFormContent } from '../../../utils/dashboard';
import { FormEditorStyled } from '../DashboardStyled';
import {
  selectContactPage,
  selectContactPageError,
  selectContactPageStatus,
  updateContactPageStatus,
} from '../../../app/slices/contactPageSlice';
import { getContactPage, patchContactPage } from '../../../app/thunks/contactPageThunk';
import { EditForm } from '../../../components/Forms/EditFormGeneral';

const ContactPageForm = () => {
  const contactPage = useAppSelector(selectContactPage);
  const formsStatus = useAppSelector(selectContactPageStatus);
  const formError = useAppSelector(selectContactPageError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getContactPage());
  }, [dispatch]);

  return (
    <>
      {showFormContent(
        formsStatus,
        <FormEditorStyled>
          {contactPage.map((page) => {
            return (
              <EditForm
                key={page._id}
                itemStatus={page.itemStatus}
                patchThunk={patchContactPage}
                changeStatus={updateContactPageStatus}
                id={page._id}
                formError={formError}
                hideBtns={true}
                showImg={[
                  {
                    imgName: 'Фото формы',
                    inputName: 'imgMain',
                    url: page?.imgMain?.url,
                    img: page?.imgMain?.img,
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

export default ContactPageForm;

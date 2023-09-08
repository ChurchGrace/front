import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { PaginationStyled } from '../../BlogPage/BlogPageStyled';
import { showFormContent } from '../../../utils/dashboard';
import { FormEditorStyled } from '../DashboardStyled';
import {
  selectContactBlockError,
  selectContactBlocks,
  selectContactBlocksBtnsStatus,
  selectContactBlocksPages,
  selectContactBlocksStatus,
  selectCreateContactBlockStatus,
  setContactBlockPhotoError,
  updateContactBlockStatus,
} from '../../../app/slices/contactBlocksSlice';
import {
  createContactBlock,
  deleteContactBlock,
  getContactBlocks,
  patchContactBlock,
} from '../../../app/thunks/contactBlockThunk';
import { WithStandartCreateForm } from '../../../components/Forms/CreateFormGeneral';
import { WithStandartEditForm } from '../../../components/Forms/EditFormGeneral';

const ContactBlockForms = () => {
  const [page, setPage] = useState(1);
  const contactBlocks = useAppSelector(selectContactBlocks);
  const formsStatus = useAppSelector(selectContactBlocksStatus);
  const createStatus = useAppSelector(selectCreateContactBlockStatus);
  const btnsStatus = useAppSelector(selectContactBlocksBtnsStatus);
  const formError = useAppSelector(selectContactBlockError);
  const pages = useAppSelector(selectContactBlocksPages);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    void dispatch(getContactBlocks({ page, limit: 6 }));
  }, [dispatch, page]);
  return (
    <>
      {showFormContent(
        formsStatus,
        <FormEditorStyled>
          <WithStandartCreateForm
            photoErrorAction={setContactBlockPhotoError}
            formStatus={createStatus}
            formError={formError}
            createThunk={createContactBlock}
            showImg={[{ imgName: 'Фото', inputName: 'imgMain' }]}
          />
          {contactBlocks.length &&
            contactBlocks.map((contactBlock) => {
              return (
                <WithStandartEditForm
                  changeStatus={updateContactBlockStatus}
                  patchThunk={patchContactBlock}
                  deleteThunk={deleteContactBlock}
                  formError={formError}
                  textItem={contactBlock.text}
                  titleItem={contactBlock.title}
                  itemStatus={contactBlock.itemStatus}
                  id={contactBlock._id}
                  btnsStatus={btnsStatus}
                  key={contactBlock._id}
                  showImg={[
                    {
                      imgName: 'Фото',
                      inputName: 'imgMain',
                      url: contactBlock?.imgMain?.url,
                      img: contactBlock?.imgMain?.img,
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

export default ContactBlockForms;

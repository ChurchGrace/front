import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios, { isAxiosError } from 'axios';
import parse, { DOMNode, domToReact } from 'html-react-parser';
import { motion } from 'framer-motion';
import { Skeleton } from '@mui/material';
import { contactFormSchema } from '../../utils/validationSchema';
import { getContactPage } from '../../app/thunks/contactPageThunk';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { isFullError } from '../../types/thunkFactory';
import PageError from '../../components/PageError';
import PromoSectionComponent from '../../components/PromoSectionComponent';
import { opacityAnimation, scaleBlockAnimation, textLeftAnimation } from '../../utils/animationSettings';
import { selectContactPage, selectContactPageStatus } from '../../app/slices/contactPageSlice';
import { StatusEnum } from '../../types/shared';
import {
  ContactFormError,
  ContactsBlock,
  ContactsBlocks,
  ContactsForm,
  ContactsFormFields,
  ContactsFormPhoto,
  ContactsMap,
  ContactsSection,
  SubmitButon,
  TextFieldStyled,
  TiltLeftStyled,
  TiltRightStyled,
} from './ContactsPageStyled';
import ContactPageSkeleton from './ContactPageSkeleton';

const ContactsPage = () => {
  const [contactPage] = useAppSelector(selectContactPage);
  const contactPageStatus = useAppSelector(selectContactPageStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      text: '',
    },
    validationSchema: contactFormSchema,
    onSubmit: async (values) => {
      try {
        setError('');
        setLoading(true);
        await axios.post(`${process.env.REACT_APP_BASE_URL!}contactForm`, values);
        formik.resetForm();
      } catch (e) {
        if (isAxiosError(e)) {
          if (isFullError(e.response?.data)) {
            setError(e.response?.data.message as string);
          } else {
            setError(e.message);
          }
        }
      }
      setLoading(false);
    },
  });

  useEffect(() => {
    void dispatch(getContactPage());
  }, [dispatch]);

  return (
    <>
      <PromoSectionComponent title='Контакты' itemStatus={contactPageStatus} />
      <ContactsSection>
        <motion.div>
          {contactPageStatus === StatusEnum.LOADED ? (
            <>
              <ContactsBlocks initial='hidden' whileInView='visible'>
                {contactPage.blocks.map((block) => {
                  return (
                    <ContactsBlock key={block._id} variants={scaleBlockAnimation}>
                      <img src={block.imgMain.url} />
                      <motion.h3 variants={textLeftAnimation}>{block.title}</motion.h3>
                      {parse(block.text, {
                        replace: (domNode) => {
                          const elem = domNode as { children: DOMNode[] };
                          return <motion.p>{domToReact(elem.children)}</motion.p>;
                        },
                      })}
                    </ContactsBlock>
                  );
                })}
              </ContactsBlocks>

              <ContactsForm>
                <TiltRightStyled>
                  <svg
                    data-name='Layer 1'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 1200 120'
                    preserveAspectRatio='none'>
                    <path d='M1200 120L0 16.48 0 0 1200 0 1200 120z' className='shape-fill'></path>
                  </svg>
                </TiltRightStyled>
                <ContactsFormFields onSubmit={formik.handleSubmit}>
                  <TextFieldStyled
                    variant='filled'
                    id='username'
                    label='Имя'
                    placeholder='Ваше имя'
                    autoComplete='off'
                    InputLabelProps={{ shrink: true }}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                  />
                  <TextFieldStyled
                    variant='filled'
                    id='email'
                    autoComplete='off'
                    label='Email'
                    placeholder='Ваше email'
                    InputLabelProps={{ shrink: true }}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <TextFieldStyled
                    autoComplete='off'
                    InputLabelProps={{ shrink: true }}
                    multiline
                    placeholder='Ваше сообщение'
                    id='text'
                    label='Текст'
                    variant='filled'
                    value={formik.values.text}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.text && Boolean(formik.errors.text)}
                    helperText={formik.touched.text && formik.errors.text}
                  />
                  <SubmitButon loading={loading} disabled={loading} type='submit' variant='contained'>
                    Отправить
                  </SubmitButon>
                  {error && <ContactFormError>{error}</ContactFormError>}
                </ContactsFormFields>
                <ContactsFormPhoto>
                  <motion.img
                    initial='hidden'
                    whileInView='visible'
                    variants={opacityAnimation}
                    src={contactPage.imgMain.url}
                  />
                </ContactsFormPhoto>
              </ContactsForm>
            </>
          ) : (
            <ContactPageSkeleton />
          )}

          <ContactsMap initial='hidden' whileInView='visible' viewport={{ amount: 0.5 }}>
            <TiltLeftStyled>
              <svg
                data-name='Layer 1'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 1200 120'
                preserveAspectRatio='none'>
                <path d='M1200 120L0 16.48 0 0 1200 0 1200 120z' className='shape-fill'></path>
              </svg>
            </TiltLeftStyled>
            {contactPageStatus === StatusEnum.LOADED ? (
              <motion.iframe
                variants={scaleBlockAnimation}
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2563.7233630763662!2d36.32254657709966!3d50.01654007151264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a75faac5b72f%3A0x4adbd2a565a97726!2z0KXQsNGA0YzQutC-0LLRgdC60LDRjyDRhtC10YDQutC-0LLRjCDQktCh0J4g0JXQpdCRICLQkdC70LDQs9C-0LTQsNGC0Ywi!5e0!3m2!1sru!2sua!4v1687256162654!5m2!1sru!2sua'
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'></motion.iframe>
            ) : (
              <Skeleton
                sx={{
                  bgcolor: 'grey.700',
                  width: '100%',
                  height: '100%',
                  transform: 'none',
                }}
              />
            )}
          </ContactsMap>
        </motion.div>
      </ContactsSection>
      {contactPageStatus === StatusEnum.ERROR && <PageError />}
    </>
  );
};

export default ContactsPage;

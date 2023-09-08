import { Skeleton } from '@mui/material';
import {
  ContactsBlock,
  ContactsBlocks,
  ContactsForm,
  ContactsFormFields,
  ContactsFormPhoto,
  TiltRightStyled,
} from './ContactsPageStyled';

const ContactPageSkeleton = () => {
  return (
    <>
      <ContactsBlocks initial='visible' whileInView='visible'>
        {[...new Array(3)].map((_, i) => {
          return (
            <ContactsBlock key={i}>
              <Skeleton
                sx={{
                  bgcolor: 'grey.700',
                  width: '100px',
                  height: '50px',
                  transform: 'none',
                  marginBottom: '15px',
                }}
              />

              <Skeleton
                sx={{
                  bgcolor: 'grey.700',
                  width: '200px',
                  height: '20px',
                  transform: 'none',
                  marginBottom: '15px',
                }}
              />

              <Skeleton
                sx={{
                  bgcolor: 'grey.700',
                  width: '100%',
                  height: '100px',
                  transform: 'none',
                  marginBottom: '15px',
                }}
              />
            </ContactsBlock>
          );
        })}
      </ContactsBlocks>

      <ContactsForm>
        <TiltRightStyled>
          <svg data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
            <path d='M1200 120L0 16.48 0 0 1200 0 1200 120z' className='shape-fill'></path>
          </svg>
        </TiltRightStyled>
        <ContactsFormFields>
          <Skeleton
            sx={{
              bgcolor: 'grey.700',
              width: '100%',
              height: '70px',
              transform: 'none',
              marginBottom: '25px',
            }}
          />
          <Skeleton
            sx={{
              bgcolor: 'grey.700',
              width: '100%',
              transform: 'none',
              marginBottom: '25px',
              height: '250px',
            }}
          />
          <Skeleton
            sx={{
              bgcolor: 'grey.700',
              width: '100%',
              height: '70px',
              transform: 'none',
              marginBottom: '25px',
            }}
          />
          <Skeleton
            sx={{
              bgcolor: 'grey.700',
              width: '100px',
              height: '45px',
              transform: 'none',
              marginBottom: '25px',
            }}
          />
        </ContactsFormFields>
        <ContactsFormPhoto>
          <Skeleton
            sx={{
              bgcolor: 'grey.700',
              width: '100%',
              height: '100%',
              transform: 'none',
              marginBottom: '15px',
            }}
          />
        </ContactsFormPhoto>
      </ContactsForm>
    </>
  );
};

export default ContactPageSkeleton;

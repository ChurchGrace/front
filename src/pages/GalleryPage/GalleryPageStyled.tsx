import styled from '@emotion/styled';

export const Gallery = styled.section`
  padding: 90px 0;
`;

export const GalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 350px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
  column-gap: 55px;
  row-gap: 90px;
  justify-content: center;
  @media (max-width: 992px) {
    column-gap: 40px;
  }
  @media (max-width: 768px) {
    column-gap: 0px;
    row-gap: 40px;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, 290px);
  }
`;

export const GalleryPhoto = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  img {
    width: 100%;
    border-radius: 25px;
    height: 100%;
    object-fit: cover;
    transition: 0.3s all;
    &:hover {
      scale: 1.1;
    }
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

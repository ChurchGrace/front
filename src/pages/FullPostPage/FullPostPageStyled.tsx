import styled from '@emotion/styled';

export const FullPostSection = styled.section`
  padding: 70px 0;
  @media (max-width: 576px) {
    padding: 50px 0;
  }
`;

export const FullPostWrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 900px 250px;
  gap: 40px;
  @media (max-width: 1400px) {
    grid-template-columns: 800px 250px;
  }
  @media (max-width: 1200px) {
    grid-template-columns: 600px 250px;
  }
  @media (max-width: 992px) {
    grid-template-columns: 700px;
  }
  @media (max-width: 768px) {
    grid-template-columns: 500px;
  }
  @media (max-width: 576px) {
    grid-template-columns: 290px;
  }
`;

export const FullPostAside = styled.div`
  @media (max-width: 992px) {
    display: none;
  }
  h4 {
    color: #fff;
    font-size: 20px;
    text-transform: uppercase;
    font-weight: 900;
    margin-bottom: 20px;
  }
`;

export const FullPostImg = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 25px 25px 0 0;
  @media (max-width: 576px) {
    height: 300px;
  }
  img {
    border-radius: 25px 25px 0 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const FullPostTextContent = styled.div`
  margin-top: 25px;
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  @media (max-width: 576px) {
    font-size: 16px;
  }
  img {
    display: block;
    margin: 10px auto;
    width: 70%;
    height: 300px;
    border-radius: 25px;
    object-fit: cover;
    @media (max-width: 576px) {
      width: 100%;
    }
  }
`;

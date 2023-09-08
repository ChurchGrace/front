import styled from '@emotion/styled';

export const SermonsSection = styled.div`
  padding: 70px 0px;
  @media (max-width: 576px) {
    padding: 50px 0px;
  }
`;

export const SermonsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  gap: 40px;
  justify-content: center;
  margin-bottom: 60px;
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 250px);
  }
  @media (max-width: 992px) {
    column-gap: 30px;
  }
  @media (max-width: 576px) {
    grid-template-columns: 250px;
  }
`;

export const SermonsButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

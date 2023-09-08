import styled from '@emotion/styled';

export const AuthFormStyled = styled.div`
  width: 600px;
  padding: 0 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 768px) {
    width: 500px;
  }
  @media (max-width: 576px) {
    width: 300px;
  }
`;

export const AuthFormWrapper = styled.div`
  position: relative;
  height: 100vh;
`;

export const AuthFormLink = styled.div`
  margin-bottom: 40px;
  color: #fff;
  text-align: center;
`;

export const AuthFormButtonWrapper = styled.div`
  @media (max-width: 576px) {
    display: flex;
    justify-content: center;
  }
`;

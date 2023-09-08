import styled from '@emotion/styled';

export const BlogItem = styled.div`
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  align-items: center;
  padding: 20px 40px 20px 20px;
  min-height: 90px;
  @media (max-width: 576px) {
    padding: 20px;
  }
`;

export const BlogItemsWrapper = styled.div`
  padding: 0 10px;
  top: 50px;
  position: relative;
  @media (max-width: 768px) {
    padding: 0 50px;
  }
  @media (max-width: 576px) {
    padding: 0px;
  }
`;

export const BlogItemInfo = styled.div`
  margin-left: 20px;
  h3 {
    font-size: 16px;
    font-weight: 900;
    text-transform: uppercase;
    margin: 0;
    @media (max-width: 576px) {
      font-size: 14px;
    }
  }
  a {
    font-size: 18px;
    text-decoration: none;
    font-weight: 900;
    margin-top: 5px;
    color: red;
    @media (max-width: 576px) {
      font-size: 12px;
    }
  }
`;

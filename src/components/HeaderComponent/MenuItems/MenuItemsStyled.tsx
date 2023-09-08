import styled from '@emotion/styled';

export const MenuItemsStyled = styled.li`
  position: relative;

  .About + ul {
    right: 50px;
  }

  .Blog + ul {
    right: -7px;
  }
`;

export const ArrowStyled = styled.span`
  margin-right: 5px;
  margin-left: 5px;
  &:after {
    content: '';
    display: inline-block;
    margin-left: 0.28em;
    vertical-align: 0.09em;
    border-top: 0.42em solid;
    border-right: 0.32em solid transparent;
    border-left: 0.32em solid transparent;
  }
`;

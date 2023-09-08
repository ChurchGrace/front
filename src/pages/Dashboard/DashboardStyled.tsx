import styled from '@emotion/styled';
import ReactQuill from 'react-quill';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';

export const AddPhotoStyled = styled.label`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ListItemTextStyled = styled(ListItemText)`
  span {
    color: ${({ isactive }: { isactive: string }) => isactive};
  }
`;

export const EditIconStyled = styled(EditIcon)`
  transition: 0.3s all;
  &:hover {
    color: #afe16fe9;
  }
`;

export const FormEditorOptionsStyled = styled.div`
  svg {
    color: #e9e9e9e9;
    cursor: pointer;
    &:nth-of-type(1) {
      margin-bottom: 10px;
    }
  }
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 20px;
  right: 15px;
}
`;

export const DeleteIconStyled = styled(DeleteIcon)`
  color: #e54c4c;
  transition: 0.3s all;
  &:hover {
    color: #ff4e4ee9;
  }
`;

export const ReactQuillStyled = styled(ReactQuill)`
  background-color: #e9e9e9e9;
  margin-bottom: 20px;
  .ql-toolbar,
  .ql-container.ql-snow {
    border: none;
  }
  .ql-editor {
    background-color: #424242 !important;
    min-height: 170px;
  }
`;

export const FormEditorImgStyled = styled.div`
  position: relative;
  background-color: #e9e9e9e9;
  position: relative;
  border-radius: 25px;
  img {
    filter: brightness(0.6);
    border-radius: 25px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const FormEditorImgWrapperStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 270px);
  justify-content: center;
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
  column-gap: 15px;
  row-gap: 20px;
`;

export const FormEditorStyled = styled.div`
  max-width: 600px;
  position: relative;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 90px;
`;

export const FormImgNameStyled = styled.div`
  border-radius: 0px 0px 25px 25px;
  bottom: 0px;
  position: absolute;
  text-align: center;
  color: #fff;
  padding: 5px;
  width: 100%;
  height: 20%;
  background-color: rgb(0 0 0 / 55%);
`;

export const GalleryPhotosStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 270px);
  column-gap: 25px;
  justify-content: center;
`;

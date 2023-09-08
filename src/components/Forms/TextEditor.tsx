import { ReactQuillStyled } from '../../pages/Dashboard/DashboardStyled';
import { ITextEditorProps } from './types';

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ color: [] }, { background: [] }],
  ['clean'],
];

export const TextEditorComponent = ({ text, setText }: ITextEditorProps) => {
  return (
    <ReactQuillStyled
      modules={{
        toolbar: toolbarOptions,
      }}
      placeholder={'Введите текст...'}
      theme='snow'
      value={text}
      onChange={setText}
    />
  );
};

export interface IAuthFormProps {
  inputs: {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    inputName: string;
  }[];
  sendFc: () => Promise<void>;
  message?: string;
  setMessage?: React.Dispatch<React.SetStateAction<string>>;
  isLogin?: boolean;
}

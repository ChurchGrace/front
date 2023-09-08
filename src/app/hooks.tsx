import { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { StatusEnum } from '../types/shared';
import type { RootState, AppDispatch } from './store';

import 'react-quill/dist/quill.snow.css';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const useFormInfo = ({
  formData,
  formDataKey,
  label,
  formStatus,
  initParams,
}: {
  formData?: FormData;
  formDataKey?: string;
  label: string;
  formStatus?: StatusEnum;
  initParams?: string;
}) => {
  const [str, setStr] = useState(initParams || '');

  const setVal = (val: string) => {
    if (formData && formDataKey) {
      formData.set(formDataKey, val);
    }
    setStr(val);
  };

  useEffect(() => {
    if (formStatus === StatusEnum.LOADED) {
      if (formData && formDataKey) {
        formData.delete(formDataKey);
      }
      setStr('');
    }
  }, [formData, formDataKey, formStatus]);

  return { str, setVal, formDataKey, label };
};

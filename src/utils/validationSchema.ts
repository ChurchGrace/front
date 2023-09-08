import * as yup from 'yup';

export const contactFormSchema = yup.object({
  email: yup.string().email('Некорректный email').required('Обязательное поле'),
  username: yup.string().min(2, 'Минимум 2 символа').required('Обязательное поле'),
  text: yup.string().min(15, 'Минимум 15 символов').required('Обязательное поле'),
});

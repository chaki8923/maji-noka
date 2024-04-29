import { z } from 'zod'

export const ContactFormSchema = z
  .object({
    email: z
      .string({ required_error: '必須項目です', invalid_type_error: '入力値に誤りがります' })
      .min(1, { message: 'メールアドレスを入力して下さい。' })
      .email({ message: 'メールアドレスの形式で入力して下さい。' })
      .max(100, { message: 'メールアドレスの形式で入力して下さい。' }),
    subject: z
      .string({ required_error: '必須項目です', invalid_type_error: '入力値に誤りがります' })
      .min(1, { message: '件名を入力して下さい。' })
      .max(30, { message: '件名は30文字以内で入力して下さい。' }),
    name: z
      .string({ required_error: '必須項目です名前', invalid_type_error: '入力値に誤りがります' })
      .min(1, { message: 'お名前を入力してください' })
      .max(20, { message: 'お名前は20文字以内で入力して下さい。' }),
    message: z
      .string({ required_error: '必須項目です', invalid_type_error: '入力値に誤りがります' })
      .min(1, { message: '本文を入力して下さい。' })
      .max(100, { message: '本文は100文字以内で入力して下さい。' })
  })

export type ContactFormType = z.infer<typeof ContactFormSchema>


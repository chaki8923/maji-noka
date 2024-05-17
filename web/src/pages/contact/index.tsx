import { useState } from "react";
import { Toast } from 'flowbite-react';
import { HiCheck } from "react-icons/hi";
import { ContactFormSchema, ContactFormType } from '@/schemas/ContactFormSchema';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

function Contact() {
  const [isSuccess, setIsSuccess] = useState<Boolean>(false);
  const methods = useForm<ContactFormType>({
    mode: 'onBlur',
    resolver: zodResolver(ContactFormSchema)
  });

  interface FormData {
    subject: string
    name: string
    email: string
    message: string
  }
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = methods

  // 本文の文字数を監視
  const messageValue = watch("message", "")
  const messageLength = messageValue.length

  const onSubmit = async (params: FormData) => {
    let data = {
      name: params.name,
      email: params.email,
      subject: params.subject,
      message: params.message,
    };

    await fetch("/api/sendmail", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        setIsSuccess(true);
        console.log("メース送信成功");
      }
    }).catch((err) => {
      alert("メール送信エラー。いらんことすな")
    })
  };

  const closeModal = (event: React.MouseEvent<HTMLSpanElement>) => {
    setIsSuccess(false)
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      {isSuccess ?
        <Toast className='fixed top-2/4 left-1/3 z-50 py-9'>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">メールを送信しました</div>
          <Toast.Toggle onClick={closeModal} />
        </Toast> : null

      }
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl mb-4 text-gray-800 text-center text-bold">お問い合わせ</h2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                件名
              </label>
              <input
                type="text"
                {...register('subject')}
                className="form-control text-gray-800 w-full"
                id="subject"
                placeholder="購入商品に関して"
              />
               {errors.subject && (
                <span className="self-start text-xs text-red-500">{errors.subject.message}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                お名前
              </label>
              <input
                type="text"
                {...register('name')}
                className="form-control text-gray-800 w-full"
                id="name"
                placeholder="田中太郎"
              />
              {errors.name && (
                <span className="self-start text-xs text-red-500">{errors.name.message}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                メールアドレス
              </label>
              <input
                type="email"
                className="form-control text-gray-800 w-full"
                id="email"
                {...register('email')}
                placeholder="example@gmail.com"
              />
              {errors.email && (
                <span className="self-start text-xs text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                内容
              </label>
              <textarea
                className="form-control text-gray-800 w-full"
                id="message"
                {...register('message')}
              />
               {errors.message && (
                <span className="self-start text-xs text-red-500">{errors.message.message}</span>
              )}
            </div>
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`w-full rounded bg-lime-600 p-3 text-white transition ${
                !isValid || isSubmitting ? "cursor-not-allowed opacity-60" : "hover:bg-lime-700"
              }`}
            >
              送信
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default Contact;


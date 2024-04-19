import { Box, Button, Container, FormControl, Stack, TextField, Typography } from "@mui/material"
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {useRouter} from "next/router";

// フォームの型
type ContactForm = {
  name: string
  email: string
  message: string
};

// バリーデーションルール
const schema = yup.object({
  name: yup.string().required('必須項目です'),
  email: yup
    .string()
    .required('必須項目です')
    .email('正しいメールアドレス入力してください'),
  message: yup
    .string().required('必須項目です'),
})

function Contact() {
  const router = useRouter();
  const { register, handleSubmit, formState: {errors}, } = useForm<ContactForm>({
    resolver: yupResolver(schema),
  });

  // フォーム送信時の処理（バリデーションOKな時に実行される）
  const onSubmit: SubmitHandler<ContactForm> = async (data) => {
    const response = await fetch("api/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      router.push("/thanks");
    } else {
      alert("正常に送信できませんでした");
    };
  }

  return (
    <>
    <main>
      <Container maxWidth='md'>
        <Box mb={6}>
          <Typography align='center'>
            このページはお問い合わせページです。<br/>
          </Typography>
        </Box>
        <Box>
          <FormControl fullWidth>
            <Stack spacing={3} direction='column' >
              <TextField variant="outlined" required label="お名前" {...register('name')} error={'name' in errors}  helperText={errors.name?.message} />
              <TextField variant="outlined" required label="メールアドレス" type="email" {...register('email')} error={'email' in errors}  helperText={errors.email?.message} />
              <TextField variant="outlined" required label="問い合わせ内容" multiline rows={6} {...register('message')} error={'message' in errors}  helperText={errors.message?.message} />
            </Stack>
            <Stack alignItems='center' mt={3} >
              <Button color="primary" variant="contained" size="large" sx={{width: '200px'}} onClick={handleSubmit(onSubmit)}>
                送信
              </Button>
            </Stack>
          </FormControl>
        </Box>
        <Box height="20vh"></Box>
      </Container>
    </main>
    </>
  )
};

export default Contact
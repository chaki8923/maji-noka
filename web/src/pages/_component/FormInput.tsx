import { Box, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { HTMLInputTypeAttribute } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface FormInputProps {
  label: string
  type?: HTMLInputTypeAttribute
  placeholder?: string
  register?: UseFormRegisterReturn
  errMessage?: string
}

export const FormInput = (props: FormInputProps) => {
  const { label, type = 'text', placeholder, register, errMessage } = props
  return (
    <Box>
      <FormControl isInvalid={!!errMessage}>
        {label}
        <Input type={type} {...register} placeholder={placeholder} />
        {!!errMessage && <FormErrorMessage>{errMessage}</FormErrorMessage>}
      </FormControl>
    </Box>
  )
}


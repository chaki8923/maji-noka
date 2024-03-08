import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var client: undefined | ReturnType<typeof prismaClientSingleton>
}

const client = globalThis.client ?? prismaClientSingleton()

export default client

if (process.env.NODE_ENV !== 'production') globalThis.client = client
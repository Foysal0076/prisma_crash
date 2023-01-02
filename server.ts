import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const test = async () => {
  // Create a new user
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@wonderland.com',
    },
  })
  console.log('Created new user: ', user)
}

test()
  .catch((e) => {
    console.log('Error: ')
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

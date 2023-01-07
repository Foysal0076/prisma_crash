import { PrismaClient, Role } from '@prisma/client'
// const prisma = new PrismaClient({ log: ['query'] })
const prisma = new PrismaClient()

async function clearDB() {
  await prisma.user.deleteMany()
  await prisma.post.deleteMany()
}

// clearDB()
const createUsers = async () => {
  // Create a new user
  const user = await prisma.user.create({
    data: {
      name: 'Foysal',
      email: 'foysalxahmed@gmail.com',
      role: Role.ADMIN,
      age: 27,
      userPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },
    include: {
      userPreference: true,
    },
  })

  const users = await prisma.user.createMany({
    data: [
      {
        name: 'Emmy Mayer',
        email: 'emmy@gmail.com',
        role: Role.BASIC,
        age: 19,
      },
      {
        name: 'Mark',
        email: 'mark@gmail.com',
        role: Role.BASIC,
        age: 25,
      },
      {
        name: 'John',
        email: 'john@gmail.com',
        role: Role.BASIC,
        age: 32,
      },
    ],
  })
  console.log('Created new user: ', user)
}

const createUserPreference = async (userId:string) => {
  const userPreference = await prisma.userPreference.create({
    data: {
      emailUpdates: true,
      weeklyDigest: true,
      User: {
        connect: {
          id: userId,
        },
      },
    },
  })
  console.log('Created new user preference: ', userPreference)
}

const findUniqueUser = async () => {
  const user = await prisma.user.findUnique({
    where: {
      email: 'emmy@gmail.com',
    },
  })
  console.log('Found user: ', user)
}

const findManyUsers = async () => {
  const users = await prisma.user.findMany({
    where: {
      age: {
        gte: 20,
      },
    },
    take: 2,
    skip: 1,
    orderBy: {
      age: 'desc',
    },
  })
  console.log('Found users: ', users)
}

// const updateUser = async () => {
//   const user = await prisma.user.update({
//     where: {
//       email: 'emmy@gmail.com',
//     },
//     data: {
//       userPreference: {
//         connect: {
//           id: 'ckq7q2q0b0000jx9x9x9x9x9x',
//         },
//       },
//     },
//   })
//   console.log('Updated user: ', user)
// }

// }
// createUsers()
//   .catch((e) => {
//     console.log('Error: ')
//     console.error(e)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })

// findUniqueUser()
//   .catch((e) => {
//     console.log('Error: ')
//     console.error(e)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })

// findManyUsers()
//   .catch((e) => {
//     console.log('Error: ')
//     console.error(e)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })

// createUserPreference()
//   .catch((e) => {
//     console.log('Error: ')
//     console.error(e)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })

const { PrismaClient, Role } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10)

  const user = await prisma.user.create({
    data: {
      name: 'Admin Jefferson',
      email: 'admin@teste.com',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  })

  console.log('Usuário criado com sucesso:')
  console.log(user)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    const user1 = await prisma.user.create({
        data: {
            name: "Samira",
            email: "samira@mail.com",
            role: "ADMIN"
        }
    });

    const user2 = await prisma.user.create({
        data: {
            name: "Ali",
            email: "ali@mail.com",
            role: "USER"
        }
    });

    const skill1 = await prisma.skill.create({
        data: { designation: "JavaScript" }
    });

    const skill2 = await prisma.skill.create({
        data: { designation: "Node.js" }
    });

    const skill3 = await prisma.skill.create({
        data: { designation: "GraphQL" }
    });

    await prisma.cv.create({
        data: {
            name: "CV Samira",
            age: 25,
            job: "Backend Dev",
            user: {
                connect: { id: user1.id }
            },
            skills: {
                connect: [
                    { id: skill1.id },
                    { id: skill2.id }
                ]
            }
        }
    });

    console.log(" Seed terminé !");
}

main()
    .catch(e => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
import { PrismaClient, Prisma, SwarmStatus, VisibilityStatus } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const notificationSettingsJson = [
  {news_and_updates: true},
  {swarm_notifications: true},
 ] as Prisma.JsonArray

 const mturkHitsResultsJson = {
  percentage: `${Math.floor(Math.random() * (100 - 60) + 60)}%`,
  scope_change: `${Math.floor(Math.random() * (30 - 0) + 0)}%`,
 } as Prisma.JsonObject

const status = ["IN_PROGRESS", "CANCELLED", "COMPLETED"];
const categories = ["PRIVATE", "PUBLIC"]
const swarms = Array.from(Array(50)).map((swarm)=>{
  return{
     title: faker.commerce.productName(),
     description: faker.commerce.productDescription(),
     category: faker.commerce.productMaterial(),
     status: status[Math.floor(Math.random() * (3 - 0) + 0)] as SwarmStatus,
     created_at: faker.date.anytime(),
     visibility: categories[Math.floor(Math.random() * (2 - 0) + 0)] as VisibilityStatus,
     
  }
   
})


const main = async () => {
  for (let i = 0; i < 30; i++) {
    const user = await prisma.user.create({
      include: {
        swarms: {
          include: {
            swarm_activities: true,
            swarm_result: true,
          },
        },
        profile: {
          include: {
            settings: true,
          },
        },
        notifications: true,
      },
      data: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        status: "ACTIVE",
        created_at: faker.date.anytime(),
        swarms: {
          createMany: {
            data: swarms
          }
          
        },
        profile: {
          create: {
            notification_enabled: faker.person.firstName().startsWith("C"),
            profile_url: faker.image.url(),
            settings: {
              create: {
                notification_settings: notificationSettingsJson
              }
            }
          },
        },
        notifications: {
          create: [
            {
              title: faker.company.catchPhrase(),
              content: faker.lorem.paragraph(),
              status: "UNREAD",
            },
            {
              title: faker.company.catchPhrase(),
              content: faker.lorem.paragraph(),
              status: "UNREAD",
            },
            {
              title: faker.company.catchPhrase(),
              content: faker.lorem.paragraph(),
              status: "UNREAD",
            },
            {
              title: faker.company.catchPhrase(),
              content: faker.lorem.paragraph(),
              status: "UNREAD",
            },
          ],
        },
      },
    });
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

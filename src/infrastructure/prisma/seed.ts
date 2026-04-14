import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/client";

const adapter = new PrismaMariaDb({
  connectionLimit: 10,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  allowPublicKeyRetrieval: true,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting seeding...");

  const paymentMethods = [
    { id: 1, name: "Dinheiro" },
    { id: 2, name: "Cartão de crédito" },
    { id: 3, name: "Cartão de débito" },
    { id: 4, name: "Pix" },
    { id: 5, name: "Cortesia" },
    { id: 6, name: "Bônus" },
    { id: 7, name: "Saldo" },
  ];

  for (const method of paymentMethods) {
    await prisma.paymentMethod.upsert({
      where: { id: method.id },
      update: { name: method.name },
      create: method,
    });
  }

  const ingressStatuses = [
    { id: 1, status: "pending" },
    { id: 2, status: "paid" },
    { id: 3, status: "canceled" },
  ];

  for (const item of ingressStatuses) {
    await prisma.ingressStatus.upsert({
      where: { id: item.id },
      update: { status: item.status },
      create: item,
    });
  }

  if (process.env.NODE_ENV !== "prod") {
    const admin = await prisma.accessUser.upsert({
      where: { email: "support@tapapp.com" },
      update: {},
      create: {
        email: "support@tapapp.com",
        name: "Admin TAP",
        password: "123456",
        document: "03089845520",
        firstAccess: false,
        emailVerified: true,
      },
    });

    const partyDate = new Date("2026-05-13T16:00:00Z");
    await prisma.party.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        name: "Esqueminha",
        date: partyDate,
        time: partyDate,
        description: "Evento de teste para desenvolvimento",
        address: "Rua de Teste, 123",
        accessUserId: admin.id,
      },
    });

    const batches = [
      {
        id: 1,
        name: "Lote Promocional",
        quantity: 50,
        priceInCents: 2000,
        isActive: true,
        partyId: 1,
      },
      {
        id: 2,
        name: "Lote 1",
        quantity: 100,
        priceInCents: 2500,
        isActive: false,
        partyId: 1,
      },
    ];

    for (const batch of batches) {
      await prisma.ingressBatch.upsert({
        where: { id: batch.id },
        update: {},
        create: batch,
      });
    }
  }

  console.log("Finished seeding...");
}

main()
  .catch((e) => {
    console.error("Error on seeding: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

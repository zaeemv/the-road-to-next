import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const tickets = [
    { title: "Ticket 1", content: "Description for Ticket 1 coming from Database", status: "DONE" as const },
    { title: "Ticket 2", content: "Description for Ticket 2 coming from Database", status: "OPEN" as const },
    { title: "Ticket 3", content: "Description for Ticket 3 coming from Database", status: "IN_PROGRESS" as const },
    { title: "Ticket 4", content: "Description for Ticket 4 coming from Database", status: "DONE" as const },
    { title: "Ticket 5", content: "Description for Ticket 5 coming from Database", status: "OPEN" as const },
]

const seed = async () => {
    const t0 = performance.now();
    console.log("DB Started Seeding...")
    await prisma.ticket.deleteMany({}) // Clear existing tickets
    await prisma.ticket.createMany({
        data: tickets,
    });
    const t1 = performance.now();
    console.log(`DB Seeding Completed in ${(t1 - t0).toFixed(2)} ms`);
}

seed();
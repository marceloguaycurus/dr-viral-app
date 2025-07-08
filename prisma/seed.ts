import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const tableData: Prisma.TableDataCreateInput[] = [
  {
    name: "Johny Doe",
    email: "john@example.com",
    role: "Moderator",
    status: "Active",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Inactive",
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Moderator",
    status: "Active",
  },
];

export async function main() {
  for (const u of tableData) {
    await prisma.tableData.create({ data: u });
  }
}

main();

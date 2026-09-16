import "dotenv/config";
import { prisma } from "../src/lib/prisma";
import { auth } from "../src/lib/auth";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error(
      "Missing ADMIN_EMAIL or ADMIN_PASSWORD in your environment. Add both to .env and try again."
    );
    process.exit(1);
  }

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    console.log(
      `An account already exists for ${email} (id: ${existing.id}, created: ${existing.createdAt.toISOString()}).`
    );
    console.log("No changes were made.");
    await prisma.$disconnect();
    return;
  }

  const result = await auth.api.signUpEmail({
    body: {
      name: "MANE FOOTWEAR Admin",
      email,
      password,
    },
  });

  console.log("Admin account created successfully.");
  console.log(`  email: ${result.user.email}`);
  console.log(`  id: ${result.user.id}`);
  console.log(`  createdAt: ${result.user.createdAt.toISOString()}`);

  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(
    "Admin setup failed:",
    error instanceof Error ? error.message : "Unknown error"
  );
  await prisma.$disconnect();
  process.exit(1);
});
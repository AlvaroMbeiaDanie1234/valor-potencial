import { db } from "../lib/db/index";
import { user } from "../lib/db/schema";
import { eq } from "drizzle-orm";

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error("Por favor, forneça o email do utilizador. Exemplo: npx tsx scripts/make-admin.ts admin@example.com");
    process.exit(1);
  }

  try {
    const existingUser = await db.select().from(user).where(eq(user.email, email));
    
    if (existingUser.length === 0) {
      console.error(`Utilizador com o email ${email} não encontrado na base de dados.`);
      process.exit(1);
    }

    await db.update(user).set({ role: "admin" }).where(eq(user.email, email));
    console.log(`Sucesso! O utilizador ${email} é agora um administrador.`);
  } catch (error) {
    console.error("Erro ao atualizar o utilizador:", error);
  } finally {
    process.exit(0);
  }
}

main();

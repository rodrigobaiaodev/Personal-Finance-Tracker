import { prisma } from "@/lib/prisma";

export default async function Home() {
  // Cria um usuário de teste no banco (só pra confirmar que a conexão funciona)
  await prisma.usuario.create({
    data: {
      nome: "Rodrigo Teste",
      email: `teste-${Date.now()}@exemplo.com`,
      senha: "123456",
    },
  });

  // Busca todos os usuários que existem no banco
  const usuarios = await prisma.usuario.findMany();

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Teste de conexão com o banco</h1>
      <p>Usuários encontrados: {usuarios.length}</p>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nome} — {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
import { prisma } from "@/lib/prisma";

export default async function Home() {
  // Creates a test user in the database (just to confirm the connection works)
  await prisma.user.create({
    data: {
      name: "Rodrigo Test",
      email: `test-${Date.now()}@example.com`,
      password: "123456",
    },
  });

  // Fetches all users from the database
  const users = await prisma.user.findMany();

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Database connection test</h1>
      <p>Users found: {users.length}</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
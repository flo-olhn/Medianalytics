import { db } from "@vercel/postgres";
import { UUID } from "crypto";

const client = await db.connect();
const bcrypt = require('bcrypt');

async function seedUsers(data = []) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;
    console.log('Created "users" table');

    const insertedUsers = await Promise.all(
      data.map(async (user : {
        id : UUID,
        email : String,
        password : String
      }) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users(id, email, password)
        VALUES (${user.id}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );
    console.log('Seeded new user');

    return {
      createTable,
      data: insertedUsers,
    }
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}
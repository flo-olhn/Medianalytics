import { db } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

const client = await db.connect();
const bcrypt = require('bcrypt');

export async function seedUsers(req: NextApiRequest, res: NextApiResponse) {
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
    const { email, password } = req.body;
    const insertedUsers = await client.sql`
      INSERT INTO users(email, password) VALUES(${email}, ${password}) ON CONFLICT (id) DO NOTHING;
    `;
    console.log('Seeded new user');
    res.status(200).json({ success: true, data: insertedUsers.rows[0] });
    return {
      createTable,
      data: insertedUsers,
    }
  } catch (error) {
    res.status(500).json({ success: false, data: 'DB Error' });
    console.error('Error seeding users:', error);
    throw error;
  } 
}
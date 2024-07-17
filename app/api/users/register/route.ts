import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

const client = await db.connect();
const bcrypt = require('bcryptjs');

export async function POST(req: Request) {
  console.log('Request received:', req.method);
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;
    const { email, password } = await req.json();
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, function(err: any, hash: string | PromiseLike<string>) {
        if (err) reject(err);
        resolve(hash);
      });
    }) as string;
    try {
      const insertUser = await client.sql`
        INSERT INTO users(email, password) VALUES(${email}, ${hashedPassword});
      `;
      return NextResponse.json({ success: true, message: 'user registered'});
    } catch(error) {
      console.error('Error creating user:', error);
      return NextResponse.json({ success: false, error: 'Error creating user' });
    }
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}
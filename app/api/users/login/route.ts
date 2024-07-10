import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

const client = await db.connect();
const bcrypt = require('bcrypt');

export async function POST(req: Request) {
  console.log('Request received:', req.method);
  try {
    const { email, password } = await req.json();
    const storedData = await client.sql`
      SELECT * FROM users where email=${email};
    `;
    if (storedData.rowCount != 0) {
      const hashedPassword = storedData.rows[0]['password'];
      console.log('hashedPassword:', hashedPassword);
      const passwordMatched = await new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, function(err: any, hash: string | PromiseLike<string>) {
          if (err) reject(err);
          resolve(hash);
        });
      });
      if (passwordMatched) {
        return NextResponse.json({ success: true, message: 'Log in successful'});
      } else {
        return NextResponse.json({ success: false, message: 'Invalid Credentials'});
      }
    } else {
      return NextResponse.json({ success: false, message: 'Invalid Credentials'});
    }
    /*
    const passwordVerified = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, function(err: any, hash: string | PromiseLike<string>) {
        if (err) reject(err);
        resolve(hash);
      });
    }) as string;
    console.log(hashedPassword);
    try {
      const insertedUsers = await client.sql`
        INSERT INTO users(email, password) VALUES(${email}, ${hashedPassword}) ON CONFLICT (id) DO NOTHING;
      `;
      return NextResponse.json({ success: true, data: insertedUsers.rows[0]});
    } catch(error) {
      console.error('Database error:', error);
      return NextResponse.json({ success: false, message: 'Database error' });
    }
    console.log('Seeded new user');*/
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}
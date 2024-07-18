import { NextResponse } from "next/server";
import { db } from "@vercel/postgres";

const client = await db.connect();

export async function POST(req: Request) {
  const { userId } = await req.json();
  try {
    const getAccounts = await client.sql`
      SELECT llt, ig_id, ig_name FROM users, accounts WHERE users.id = ${userId} AND users.id = accounts.user_id;
    `;
    return NextResponse.json({ success: true, getAccounts });
  } catch(error) {
    return NextResponse.json({ success: false, error: 'Error retrieving accounts' });
  } finally {
    //client.release();
  }
}
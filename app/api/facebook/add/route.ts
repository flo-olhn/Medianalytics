import { NextResponse } from 'next/server';
import { db } from '@vercel/postgres';

const client = await db.connect();

export async function POST(req: Request) {
    //const url = "https://www.facebook.com/v20.0/dialog/oauth?client_id=1506990123556068&display=page&extras={'setup':{'channel':'IG_API_ONBOARDING'}}&response_type=token&scope=instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement";
    console.log('request received', req.method);
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS accounts (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                user_id UUID NOT NULL,
                llt TEXT NOT NULL UNIQUE,
                fb_id TEXT NOT NULL UNIQUE,
                fb_Name TEXT NOT NULL,
                ig_id TEXT NOT NULL UNIQUE,
                ig_name TEXT NOT NULL
            );
        `;
        const { userId, longLivedToken, fbId, fbName, igId, igName } = await req.json();
        console.log(userId, longLivedToken, fbId, fbName, igId, igName);
        try {
            const insertAccount = await client.sql`
                INSERT INTO accounts(user_id, llt, fb_id, fb_name, ig_id, ig_name) VALUES(${userId}, ${longLivedToken}, ${fbId}, ${fbName}, ${igId}, ${igName});
            `;
            return NextResponse.json({ success: true, message: 'account added' });
        } catch (error) {
            return NextResponse.json({ success: false, error: 'Error adding account' });
        }
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}


//export { handler as GET, handler as POST };
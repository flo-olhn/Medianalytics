import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from "@vercel/postgres";
const bcrypt = require('bcryptjs');

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials, req) => {
                if (!credentials) return null;
                const client = await db.connect();
                try {
                    const result = await client.sql`
                        SELECT * FROM users WHERE email = ${credentials?.email};
                    `;
                    const user = result.rows[0];

                    if (user && bcrypt.compareSync(credentials.password, user.password)) {
                        return { id: user.id, email: user.email };
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error('Error during authentication:', error);
                    return null;
                } finally {
                    client.release();
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            } else {
                session.user = { id: token.id as string };
            }
            return session;
        }
    },
    pages: {
        signIn: '/auth/signin',
    },
});

export { handler as GET, handler as POST };
'use client';

import { useSession, signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
          console.log('unauthenticated');
          signIn();
        }
    }, [status]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (status === "authenticated") {
        //redirect('/dashboard');
        return (
            <div>Dashboard</div>
        )
    }

    return null;
}
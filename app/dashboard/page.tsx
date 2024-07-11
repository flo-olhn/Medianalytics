'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import NavTop from '../components/dashboard/NavTop';
import NavRight from '../components/dashboard/NavRight';

export default function Dashboard() {
    const { data: session, status } = useSession();
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        if (status === "unauthenticated") {
          console.log('unauthenticated');
          signIn();
        }
        if (status === "authenticated" && session?.user) {
            setUserId(session.user.id);
        }
    }, [session, status, userId]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }
    return (
        <div className='w-full h-full bg-slate-200'>
            <NavTop></NavTop>
            <NavRight></NavRight>
        </div>
    )
}
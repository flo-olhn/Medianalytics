'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import NavTop from '../components/dashboard/NavTop';
import NavRight from '../components/dashboard/NavRight';
import FacebookLoginButton from '../components/FacebookLoginBtn';

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
        return (
            <div className='w-full h-full bg-slate-200'>
                <NavTop></NavTop>
                <NavRight></NavRight>
            </div>
        )
    }

    return null;
}
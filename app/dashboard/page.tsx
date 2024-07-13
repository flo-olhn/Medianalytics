'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import NavTop from '../components/dashboard/NavTop';
import NavRight from '../components/dashboard/NavRight';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export default function Dashboard() {
    //const router = useRouter();
    const { data: session, status } = useSession();
    const [userId, setUserId] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [longLivedToken, setLLT] = useState<string | null>(null);

    useEffect(() => {
        if (status === "unauthenticated") {
          console.log('unauthenticated');
          signIn();
        }
        if (status === "authenticated" && session?.user) {
            setUserId(session.user.id);
            const getToken = () => {
                const hash = window.location.hash;
                if (hash) {
                    const params = new URLSearchParams(hash.substring(1));
                    const access_token = params.get('access_token');
                    const llt = params.get('long_lived_token');
                    if (access_token) {
                        setAccessToken(access_token);
                        setLLT(llt);
                    }
                }
            };
            getToken();
            console.log(accessToken);
            console.log(longLivedToken);
        }
    }, [accessToken, longLivedToken, session, status, userId]);

    if (status === "loading") {
        return <div>Loading...</div>
    }
    
    return (
        <div className='w-full h-full bg-slate-200'>
            <NavTop></NavTop>
            <NavRight></NavRight>
        </div>
    )
}
'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import NavTop from '../components/dashboard/NavTop';
import NavRight from '../components/dashboard/NavRight';

export default function Dashboard() {
    //const router = useRouter();
    
    const { data: session, status } = useSession();
    const [userId, setUserId] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [longLivedToken, setLLT] = useState<string | null>(null);
    const [fbId, setFbId] = useState<string | null>(null);
    const [fbName, setFbName] = useState<string | null>(null);
    const [igId, setIgId] = useState<string | null>(null);
    const [igName, setIgName] = useState<string | null>(null);
    const [acc, setAcc] = useState<any[]>([]);
    
    if (status === "unauthenticated") {
        console.log('unauthenticated');
        signIn();
    }
    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            setUserId(session.user.id);
            const accounts: any[] = [];
            const retrieveAccounts = async () => {
                const res = await fetch('/api/facebook/get', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify({ userId }),
                });
                const response = await res.json();
                response.getAccounts.rows.forEach((account: { ig_id: any, ig_name: any, selected: boolean }) => {
                    console.log(account.ig_id);
                    accounts.length === 0 ? account.selected = true : account.selected = false;
                    accounts.push(account);
                });
                console.log(accounts, typeof(accounts));
                setAcc(accounts);
            };
            retrieveAccounts();
            
            const getToken = async () => {
                const hash = window.location.hash;
                if (hash) {
                    const params = new URLSearchParams(hash.substring(1));
                    const access_token = params.get('access_token');
                    const llt = params.get('long_lived_token');
                    if (access_token !== null) {
                        setAccessToken(access_token);
                        setLLT(llt);
                    }
                }
            };
            getToken();
            if (accessToken !== null && longLivedToken !== null) {
                const getFbInfo = async () => {
                    if (fbId === null && fbName === null) {
                        const response = await fetch(`https://graph.facebook.com/v20.0/me?fields=id,name&access_token=${longLivedToken}`);
                        const data = await response.json();
                        //console.log(data.id, data.name);
                        if (response.status === 200) {
                            if (data.id !== null && data.name !== null) {
                                setFbId(data.id);
                                setFbName(data.name);
                            }
                        }
                    }
                };
                getFbInfo();
                if (fbId !== null && fbName !== null) {
                    const getIgInfo = async() => {
                        if (igId === null && igName === null) {
                            const response = await fetch(`https://graph.facebook.com/v20.0/${fbId}/?fields=businesses&access_token=${longLivedToken}`);
                            const d = await response.json();
                            if (response.status === 200) {
                                console.log(d.businesses.data);
                                if (d.businesses.data[0].id !== null && d.businesses.data[0].name !== null) {
                                    setIgId(d.businesses.data[0].id);
                                    setIgName(d.businesses.data[0].name);
                                }
                            }
                        }
                    }
                    getIgInfo();
                    console.log(igId, igName);
                    if (igId !== null && igName !== null) {
                        const addAccount = async () => {
                            const res = await fetch('/api/facebook/add', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json', 
                                },
                                body: JSON.stringify({ userId, longLivedToken, fbId, fbName, igId, igName }),
                            });
                            const data = await res.json();
                            if (data.success) {
                                setLLT(null);
                                setFbId(null);
                                setFbName(null);
                                //window.location.href = '/dashboard'
                            }
                        };
                        addAccount();
                    }
                }
            }
        }
    }, [accessToken, fbId, fbName, igId, igName, longLivedToken, session, status, userId]);

    if (status === "loading") {
        return <div>Loading...</div>
    }

    
    
    return (
        <div className='w-full h-full bg-slate-200'>
            <NavTop></NavTop>
            <NavRight accounts={acc}></NavRight>
        </div>
    )
}
'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import NavTop from '../components/dashboard/NavTop';
import NavRight from '../components/dashboard/NavRight';
import { stringify } from 'querystring';
import getToken from '../components/FacebookLoginBtn';
import getFbData from '../components/FacebookLoginBtn';

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
    if (status === "unauthenticated") {
        console.log('unauthenticated');
        signIn();
    }
    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            setUserId(session.user.id);

            const retrieveAccounts = () => {

            };

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
                            const res = await fetch('/api/facebook/callback', {
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
                                window.location.href = '/dashboard'
                            }
                        };
                        addAccount();
                    }
                }
            }
        }
    }, [accessToken, fbId, fbName, igId, igName, longLivedToken, session, status, userId]);
    /*
    useEffect(() => {
        if (accessToken !== null && longLivedToken !== null) {
            console.log(accessToken);
            console.log(longLivedToken);
            const getFbData = async () => {
                if (fbId === null && fbName === null) {
                    const response = await fetch("https://graph.facebook.com/v20.0/me?fields=id,name&access_token=EAAVamXrZBnOQBOZCBXfkWuVUXLc0Qgxu6JJXbPVc3DJFfTh0CZBdDZC36qfDCnw0fweTnkcK2JceQjnli3Qj7lLu54owJZAl5TcLd2gNCnq53K9i1y5BQfSX3qkDIvq8L6vD7YZCsyNiGSdNZCZBOc8jz75K4jTshluj3nR1PPb5Tn66VRZAtGufshgwZB6ykWZCZBTmJQZDZD")
                    const data = await response.json();
                    //console.log(data.id, data.name);
                    if (response?.status === 200) {
                        if (data.id !== '' && data.name !== '') {
                            setFbId(data.id);
                            setFbName(data.name);
                        }
                    }
                }
            }
            getFbData();
            console.log(fbId, fbName);
        }
    }, [accessToken, fbId, fbName, longLivedToken]);*/

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
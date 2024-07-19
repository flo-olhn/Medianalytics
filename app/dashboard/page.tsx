'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import NavTop from '../components/dashboard/NavTop';
import NavRight from '../components/dashboard/NavRight';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const { data: session, status } = useSession();
    const [userId, setUserId] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [longLivedToken, setLLT] = useState<string | null>(null);
    const [fbId, setFbId] = useState<string | null>(null);
    const [fbName, setFbName] = useState<string | null>(null);
    const [igId, setIgId] = useState<string | null>(null);
    const [igName, setIgName] = useState<string | null>(null);
    const [accounts, setAcc] = useState<any[]>([]);
    const [followers, setFollowers] = useState<number>(0);
    const [selectedId, setSelectedId] = useState<string>('');
    const [hasFetchedToken, setHasFetchedToken] = useState(false);
    const [hasFetchedFbInfo, setHasFetchedFbInfo] = useState(false);
    const [hasFetchedIgId, setHasFetchedIgId] = useState(false);
    const [hasFetchedIgName, setHasFetchedIgName] = useState(false);
    const [hasAddedAccount, setHasAddedAccount] = useState(false);
    const r = useRouter();

    if (status === "unauthenticated") {
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
                if (response?.success) {
                    response.getAccounts.rows.forEach((account: { llt: any, ig_id: any, ig_name: any, selected: boolean, profile_pic: string, follower_cnt: number | null, impressions: number, reach: number, profile_views: number, impressions_yday: number, reach_yday: number, profile_views_yday: number}) => {
                        if (accounts.length === 0) {
                            account.selected = true;
                            setSelectedId(account.ig_id);
                        } else {
                            account.selected = false;
                        }
                        account.profile_pic = '';
                        account.follower_cnt = null;
                        account.impressions = 0;
                        account.reach = 0;
                        account.profile_views = 0;
                        account.impressions_yday = 0;
                        account.reach_yday = 0;
                        account.profile_views_yday = 0;
                        accounts.push(account);
                    });
                    setAcc(accounts);
                }
            };
            retrieveAccounts();
            r.refresh();
        }
    }, [status, session?.user, userId, hasAddedAccount, longLivedToken, r]);

    useEffect(() => {
        if (status === "authenticated" && session?.user && !hasFetchedToken) {
            const getToken = async () => {
                const hash = window.location.hash;
                if (hash) {
                    const params = new URLSearchParams(hash.substring(1));
                    const access_token = params.get('access_token');
                    const llt = params.get('long_lived_token');
                    if (access_token !== null) {
                        setAccessToken(access_token);
                        setLLT(llt);
                        setHasFetchedToken(true);
                    }
                }
            };
            getToken();
        }
    }, [status, session?.user, hasFetchedToken]);

    useEffect(() => {
        if (accessToken && longLivedToken && !hasFetchedFbInfo) {
            const getFbInfo = async () => {
                const response = await fetch(`https://graph.facebook.com/v20.0/me/accounts?access_token=${longLivedToken}`);
                const data = await response.json();
                if (response?.ok) {
                    if (data.id !== null && data.name !== null) {
                        setFbId(data.data[0].id);
                        setFbName(data.data[0].name);
                        setHasFetchedFbInfo(true);
                    }
                }
            };
            getFbInfo();
        }
    }, [accessToken, longLivedToken, hasFetchedFbInfo]);

    useEffect(() => {
        if (fbId && longLivedToken && !hasFetchedIgId) {
            const getIgId = async () => {
                const response = await fetch(`https://graph.facebook.com/v20.0/${fbId}/?fields=instagram_business_account&access_token=${longLivedToken}`);
                const data = await response.json();
                if (response.status === 200) {
                    if (data.instagram_business_account.id !== null) {
                        setIgId(data.instagram_business_account.id);
                        setHasFetchedIgId(true);
                    }
                }
            };
            getIgId();
        }
    }, [fbId, longLivedToken, hasFetchedIgId]);

    useEffect(() => {
        if (igId && longLivedToken && !hasFetchedIgName) {
            const getIgName = async () => {
                const response = await fetch(`https://graph.facebook.com/v20.0/${igId}/?fields=username&access_token=${longLivedToken}`);
                const data = await response.json();
                if (response.status === 200) {
                    setIgName(data.username);
                    setHasFetchedIgName(true);
                }
            };
            getIgName();
        }
    }, [igId, longLivedToken, hasFetchedIgName]);

    useEffect(() => {
        if (userId && longLivedToken && fbId && fbName && igId && igName && !hasAddedAccount) {
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
                    setIgId(null);
                    setIgName(null);
                    setHasAddedAccount(true);
                }
            };
            if (!hasAddedAccount) {
                addAccount();
            }
        }
    }, [userId, longLivedToken, fbId, fbName, igId, igName, hasAddedAccount]);

    useEffect (() => {
        if (selectedId) {
            accounts.forEach((account) => {
                const getProfilePic = async() => {
                    const response = await fetch(`https://graph.facebook.com/v20.0/${account.ig_id}?fields=profile_picture_url&access_token=${account.llt}`);
                    const url = await response.json();
                    if (response?.ok) {
                        account.profile_pic = url.profile_picture_url;
                        r.refresh();
                    }
                };
                getProfilePic();
                if (account.selected) {
                    const getFollowers = async () => {
                        const response = await fetch(`https://graph.facebook.com/v20.0/${account.ig_id}?fields=business_discovery.username(${account.ig_name}){followers_count}&access_token=${account.llt}`);
                        const data = await response.json();
                        if (response?.ok) {
                            setFollowers(data.business_discovery.followers_count);
                            setSelectedId(account.ig_id);
                            if (data.business_discovery.followers_count <= 100) {
                                account.follower_cnt = null;
                            }
                        } else {
                            setFollowers(0);
                        }
                    };
                    getFollowers();
                    
                    const getAccInsights = async () => {
                        const response = await fetch(`https://graph.facebook.com/v20.0/${account.ig_id}/insights?metric=follower_count,impressions,reach,profile_views&period=day&access_token=${account.llt}`);
                        const data = await response.json();
                        if (response?.ok) {
                            if (account.follower_cnt !== null) {
                                account.follower_cnt = data.data[0].values[1].value;
                                account.impressions = data.data[1].values[1].value;
                                account.reach = data.data[2].values[1].value;
                                account.profile_views = data.data[3].values[1].value;
                                account.impressions_yday = data.data[1].values[0].value;
                                account.reach_yday = data.data[2].values[0].value;
                                account.profile_views_yday = data.data[3].values[0].value;
                            } else {
                                account.follower_cnt = null;
                                account.impressions = data.data[0].values[1].value;
                                account.reach = data.data[1].values[1].value;
                                account.profile_views = data.data[2].values[1].value;
                                account.impressions_yday = data.data[0].values[0].value;
                                account.reach_yday = data.data[1].values[0].value;
                                account.profile_views_yday = data.data[2].values[0].value;
                            }
                            r.refresh();
                        } else {
                            account.follower_cnt = null;
                            account.impressions = 0;
                            account.reach = 0;
                            account.profile_views = 0;
                            account.impressions_yday = 0;
                            account.reach_yday = 0;
                            account.profile_views_yday = 0;
                        }
                    };
                    getAccInsights();
                }
            })
        }
    }, [accounts, r, selectedId]);

    if (status === "loading") {
        return <div>Loading...</div>
    }

    return (
        <div className='w-full h-full bg-slate-200'>
            <NavTop accounts={accounts} followers={followers}></NavTop>
            <NavRight accounts={accounts} selectedId={setSelectedId}></NavRight>
        </div>
    );
}
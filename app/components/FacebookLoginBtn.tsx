"use client";

import React, { useEffect, useState } from 'react';

declare global {
    interface Window {
        FB: any;
        fbAsyncInit: () => void;
    }
}

const FacebookLoginButton: React.FC = () => {
    const [isSdkLoaded, setIsSdkLoaded] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const checkSdkLoad = () => {
            if (window.FB) {
                setIsSdkLoaded(true);
                checkLoginState();
            }
        };

        const checkLoginState = () => {
            if (window.FB) {
                window.FB.getLoginStatus((response: any) => {
                    statusChangeCallback(response);
                });
            }
        };

        const loadSdkAsynchronously = () => {
            ((d, s, id) => {
                let js: HTMLScriptElement;
                const fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    checkSdkLoad();
                    return;
                }
                js = d.createElement(s) as HTMLScriptElement;
                js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                js.onload = checkSdkLoad;
                if (fjs && fjs.parentNode) {
                    fjs.parentNode.insertBefore(js, fjs);
                } else {
                    d.head.appendChild(js);
                }
            })(document, 'script', 'facebook-jssdk');
        };

        loadSdkAsynchronously();

        window.fbAsyncInit = () => {
            window.FB.init({
                appId: '1537772970496693', // Remplacez 'YOUR_APP_ID' par l'ID de votre application
                cookie: true,
                xfbml: true,
                version: 'v20.0'
            });
            checkSdkLoad();
        };
    }, []);

    const statusChangeCallback = (response: any) => {
        if (response.status === 'connected') {
            setIsLoggedIn(true);
            fetchUserData();
        } else {
            setIsLoggedIn(false);
            setUserName(null);
        }
    };

    const fetchUserData = () => {
        window.FB.api('/me', (response: any) => {
            setUserName(response.name);
        });
    };

    const handleLogin = () => {
        if (isSdkLoaded && window.FB) {
            window.FB.login((response: any) => {
                statusChangeCallback(response);
                console.log(response.authResponse.userID, response.authResponse.accessToken); // getting user info after logging (userID + accessToken)
            }, { scope: 'pages_show_list,instagram_basic,pages_read_engagement' });
        }
    };

    const handleLogout = () => {
        if (isSdkLoaded && window.FB) {
            window.FB.logout((response: any) => {
                statusChangeCallback(response);
            });
        }
    };

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <p>Bienvenue, {userName}!</p>
                    <button onClick={handleLogout} style={buttonStyle}>Déconnexion</button>
                </div>
            ) : (
                <button onClick={handleLogin} style={buttonStyle}>Connexion avec Facebook</button>
            )}
        </div>
    );
};

const buttonStyle = {
    backgroundColor: '#4267B2',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
};

export default FacebookLoginButton;
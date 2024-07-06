import { useEffect } from 'react';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        // Charger le SDK Facebook
        (function (d, s, id) {
            var js: HTMLScriptElement, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s) as HTMLScriptElement; 
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            if (fjs && fjs.parentNode) {
                fjs.parentNode.insertBefore(js, fjs);
            } else {
                d.head.appendChild(js);
            }
        }(document, 'script', 'facebook-jssdk'));

        // Initialiser le SDK Facebook
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '1537772970496693', // Remplacez 'YOUR_APP_ID' par l'ID de votre application
                cookie: true,
                xfbml: true,
                version: 'v20.0',
                ignoreSdkError: true,
            });
        };
    }, []);

    return <Component {...pageProps} />
}

export default MyApp;
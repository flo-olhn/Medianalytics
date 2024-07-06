'use client';

import React from 'react';

const FacebookLoginButton = () => {
    const handleLogin = () => {
        const clientId = '1537772970496693';
        const redirectUri = 'https://my-clever-redirect-url.com/success/';
        const scope = [
            'instagram_basic',
            'instagram_content_publish',
            'instagram_manage_comments',
            'instagram_manage_insights',
            'pages_show_list',
            'pages_read_engagement'
        ].join(',');

        const authUrl = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${clientId}&display=page&extras={"setup":{"channel":"IG_API_ONBOARDING"}}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${scope}`;

        window.location.href = authUrl;
    };

    return (
        <button onClick={handleLogin} style={buttonStyle}>
            Login to Facebook
        </button>
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
"use client";

import React, { useEffect, useState } from 'react';
import AddAccount from './dashboard/AddAccount';

const FacebookLoginButton = () => {

    const handleLogin = () => {
        console.log('here');
        const clientId = process.env.NEXT_PUBLIC_FB_APPID;
        const display = 'page';
        const extras = '{"setup":{"channel":"IG_API_ONBOARDING"}';
        const redirectUri = 'https://localhost:3000/dashboard';
        const scope = 'instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement';
        const url = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=token`;
        window.location.href = url;
    };

    return (
        <button onClick={handleLogin}>
            <AddAccount></AddAccount>
        </button>
    );
};

export default FacebookLoginButton;
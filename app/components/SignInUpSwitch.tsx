'use client';

import { useState } from "react";
import React from "react";
import { ReactDOM } from "react";

export default function SignInUpSwitch() {
    const [signIn, setSignIn] = useState(true);
    const [signUp, setSignUp] = useState(false);
    function handleSignIn() {
        setSignIn(true);
        setSignUp(false);
    };
    function handleSignUp() {
        setSignIn(false);
        setSignUp(true);
    };
    return (
        <>
            <div className="flex w-full h-16">
                {signIn && <div className="flex w-1/2 h-full border-r border-slate-300 items-center justify-center" onClick={handleSignIn}>Sign In</div>}
                {!signUp && <div className="flex w-1/2 h-full bg-slate-100 items-center justify-center text-gray-500 hover:cursor-pointer" onClick={handleSignUp}>Sign Up</div>}
                {!signIn && <div className="flex w-1/2 h-full bg-slate-100 items-center justify-center text-gray-500 hover:cursor-pointer" onClick={handleSignIn}>Sign In</div>}
                {signUp && <div className="flex w-1/2 h-full border-l border-slate-300 items-center justify-center" onClick={handleSignUp}>Sign Up</div>}
            </div>
            <div className="w-full h-[calc(100%_-_4rem)] flex flex-col items-center justify-center">
                <form action="" method="post" className="">
                    <input type="text" name="email" id="email" className="w-full h-12 bg-slate-100 rounded px-5 py-5 border border-slate-300 mb-6 outline-none" placeholder="Email address" /><br />
                    <input type="password" name="password" id="password" className="w-full h-12 bg-slate-100 rounded px-5 py-5 border border-slate-300 outline-none" placeholder="Password" />
                    <input type="submit" value="Sign In" className="w-full h-14 rounded bg-slate-300 outline-none mt-12 hover:bg-blue-500 hover:text-white hover:cursor-pointer hover:transition" />
                </form>
            </div>
            
        </>
    )
}
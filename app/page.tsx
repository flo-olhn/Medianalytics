import Image from "next/image";
import { useEffect } from "react";
import FacebookLoginButton from "@/app/components/FacebookLoginBtn";
import React from "react";
import SignInUpSwitch from "./components/SignInUpSwitch";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col h-full w-full">
      <div className="flex w-full h-16 border-b items-center justify-center border-slate-300 bg-white">
        <p className="flex items-center text-2xl md:text-3xl">Medianalytics</p>
      </div>
    <div className="absolute right-0 border-l border-slate-300 w-2/5 h-[calc(100%_-_4rem)] top-16">
      <SignInUpSwitch />
    </div>
      <div className="hidden">
        <FacebookLoginButton />      
      </div>
    </main>
  );
}

import Image from "next/image";
import { useEffect } from "react";
import FBInit from "@/app/components/fbinit";
import { initFacebookSdk } from "@/app/lib/initFBSDK";

initFacebookSdk().then(Home);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex w-full h-16 border-b items-center justify-center border-slate-300">
        <p className="flex items-center text-2xl md:text-3xl">Medianalytics</p>
      </div>
      <FBInit />
      
    </main>
  );
}

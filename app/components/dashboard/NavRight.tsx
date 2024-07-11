/*
TODO: fix issue next-auth jwt_session_error decryption operation failed
      causing app to reload to home page
*/

import FacebookLoginButton from "../FacebookLoginBtn";
import AddAccount from "./AddAccount";

export default function NavRight() {
  return (
    <div className="absolute w-16 h-[calc(100%_-_4rem)] bg-white border-l border-slate-300 bottom-0 right-0 hover:w-40 transition-all duration-300">
      <div id="add-account" className="group flex w-full h-16 border-b border-slate-300 items-center justify-center hover:cursor-pointer">
        <FacebookLoginButton></FacebookLoginButton>
      </div>
      
    </div>
  );
}
import { Key } from "react";
import FacebookLoginButton from "../FacebookLoginBtn";
import AddAccount from "./AddAccount";

export default function NavRight(props) {
  return (
    <div className="absolute w-16 h-[calc(100%_-_4rem)] bg-white border-l border-slate-300 bottom-0 right-0 hover:w-40 transition-all duration-300">
      {props.accounts.map((account, index) => (
        <div className="w-full h-16 bg-pink-200" key={index}>{account.ig_name}</div>
      ))}
      <div id="add-account" className="group flex w-full h-16 border-b border-slate-300 items-center justify-center hover:cursor-pointer">
        <FacebookLoginButton></FacebookLoginButton>
      </div>
      
    </div>
  );
}
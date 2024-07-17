import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import FacebookLoginButton from "../FacebookLoginBtn";
import AddAccount from "./AddAccount";

export default function NavRight(props: { accounts: any[]; }) {
  const acc_length: number = props.accounts.length + 1;
  console.log(acc_length);
  const calc_height = `[calc(100%_-_${acc_length}*4rem)]`
  return (
    <>
      <div className={`absolute w-16 h-[calc(100%_-_4rem)] bg-transparent bottom-0 right-0 hover:w-40 transition-all duration-300`}>
        
        {props.accounts.map((account, index) => (
          account.selected === true ?
            <div className="w-full h-16 bg-slate-200 border-b border-slate-300" key={index}>{account.ig_name}</div> :
            <div className="w-full h-16 bg-white border-l border-b border-slate-300" key={index}>{account.ig_name}</div>
        ))}
        
        <div id="add-account" className="group flex w-full h-16 bg-white items-center justify-center hover:cursor-pointer border-l border-slate-300">
          <FacebookLoginButton></FacebookLoginButton>
        </div>
        <div className={`w-full h-full bg-white border-l border-slate-300`}>
        </div>
      </div>
    </>
  );
}
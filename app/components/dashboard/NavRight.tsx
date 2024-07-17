import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import FacebookLoginButton from "../FacebookLoginBtn";
import AddAccount from "./AddAccount";

export default function NavRight(props: { accounts: any[]; }) {
  const acc_length: number = props.accounts.length + 1;
  console.log(acc_length);
  const calc_height = `calc(100%_-_calc(${acc_length}_*_4rem))`
  return (
    <>
      
      <div className={`group absolute flex flex-col flex-1 h-[calc(100%_-_4rem)] w-16 bg-white right-0 hover:w-40 transition-all duration-300`}>
        
        {props.accounts.map((account, index) => (
          account.selected === true ?
            <div className="flex w-full h-16 bg-slate-200 border-b border-slate-300 items-center justify-center" key={index}>
              <p className="absolute flex right-[4.5rem] w-20 h-8 bg-slate-300 items-center rounded justify-center group-hover:transition transition group-hover:duration-300 duration-300">{account.ig_name}</p>
              <div className="absolute w-10 h-10 bg-slate-300 rounded-full right-[0.75rem] group-hover:transition transition group-hover:duration-300 duration-300"></div>
            </div> :
            <div className="flex items-center justify-center w-full h-16 bg-white border-l border-b border-slate-300" key={index}>
              <p className="absolute flex invisible group-hover:visible right-[4.5rem] group-hover:delay-100 w-20 h-8 bg-slate-300 items-center rounded justify-center group-hover:transition-all group-hover:delay-300 transition group-hover:duration-300 duration-300">{account.ig_name}</p>
              <div className="absolute w-10 h-10 bg-slate-300 rounded-full right-[0.75rem] group-hover:transition transition group-hover:duration-300 duration-300"></div>
            </div>
        ))}
        <div id="add-account" className="group flex w-full h-16 bg-white items-center justify-center hover:cursor-pointer border-l border-slate-300">
          <FacebookLoginButton></FacebookLoginButton>
        </div>
        <div className={`relative w-full h-full border-l border-slate-300`}></div>
      </div>
      
    </>
  );
}
import { AwaitedReactNode, JSXElementConstructor, Key, MouseEvent, ReactElement, ReactEventHandler, ReactNode, ReactPortal } from "react";
import FacebookLoginButton from "../FacebookLoginBtn";
import AddAccount from "./AddAccount";
import { useRouter } from "next/navigation";

export default function NavRight(props: { accounts: any[]; }) {
  //var accounts = props.accounts;
  const r = useRouter();
  const handleSelectAccount = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, account: any) => {
    event.preventDefault();
    props.accounts.forEach((acc) => {
      (account.account.ig_id === acc.ig_id) ? acc.selected = true : acc.selected = false;
    });
    r.refresh();
  };
  return (
    <>
      
      <div className={`group absolute flex flex-col flex-1 h-[calc(100%_-_4rem)] w-16 bg-white right-0 hover:w-40 transition-all duration-300`}>

        {props.accounts.map((account, index) => (
          account.selected === true ?
          <div className="flex w-full h-16 bg-slate-200 border-b border-slate-300 items-center justify-center" key={index}>
            <div className="absolute flex items-center px-4 text-center right-[4.45rem] w-20 h-8 bg-blue-500 rounded group-hover:transition-all group-hover:delay-300 transition group-hover:duration-300 duration-300">
              <p className="text-sm text-ellipsis overflow-hidden text-white transition transition duration-300 delay-300">{account.ig_name}</p>
            </div>
            <div className="absolute w-10 h-10 bg-slate-300 rounded-full right-[0.75rem] group-hover:transition transition group-hover:duration-300 duration-300"></div>
          </div> :
          <div className="flex items-center justify-center w-full h-16 bg-white border-l border-b border-slate-300 hover:cursor-pointer hover:bg-slate-100 hover:transition-all hover:duration-150 transition-all duration-150" key={index} onClick={(event) => handleSelectAccount(event, {account})}>
            <div className="absolute flex items-center px-4 text-center invisible group-hover:visible right-[4.45rem] w-20 h-8 bg-slate-300 rounded group-hover:transition-all group-hover:delay-300 transition group-hover:duration-300 duration-300">
              <p className="text-sm text-ellipsis overflow-hidden transition duration-300 delay-300 text-gray-500">{account.ig_name}</p>
            </div>
            
            <div className="absolute w-10 h-10 bg-slate-300 rounded-full right-[0.75rem] group-hover:transition transition group-hover:duration-300 duration-300"></div>
          </div>
        ))}
        
        <div id="add-account" className="flex w-full h-16 bg-white items-center justify-center hover:cursor-pointer border-l border-slate-300">
          <FacebookLoginButton></FacebookLoginButton>
        </div>
        <div className={`relative w-full h-full border-l border-slate-300`}></div>
      </div>
      
    </>
  );
}
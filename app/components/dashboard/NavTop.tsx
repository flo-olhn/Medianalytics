import MenuIcon from "../MenuIcon";
import AccountInsights from "./AccountInsights";

export default function NavTop(props: { accounts: any[]; followers: number; }) {
  return (
    <div className="flex w-full h-16 bg-white border-b border-slate-300">
      
      <div className="w-16 h-16 border-r border-slate-300 flex items-center justify-center text-4xl">
        <p>M</p>
      </div>
      <AccountInsights accounts={props.accounts} followers={props.followers}></AccountInsights>
      <div className="group absolute right-0 w-16 h-16 border-l border-slate-300 flex items-center justify-center hover:cursor-pointer">
        <MenuIcon></MenuIcon>
      </div>
      
    </div>
  );
}
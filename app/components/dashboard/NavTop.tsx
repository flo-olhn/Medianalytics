import MenuIcon from "../MenuIcon";

export default function NavTop() {
  return (
    <div className="flex w-full h-16 bg-white border-b border-slate-300">
      <div className="w-16 h-16 border-r border-slate-300 flex items-center justify-center text-4xl">
        <p>M</p>
      </div>
      <div className="group absolute right-0 w-16 h-16 border-l border-slate-300 flex items-center justify-center hover:cursor-pointer">
        <MenuIcon></MenuIcon>
      </div>
    </div>
  );
}
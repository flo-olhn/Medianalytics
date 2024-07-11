import PlusIcon from "../PlusIcon";

export default function AddAccount() {
  return (
    <div id="add-account" className="group flex w-full h-16 border-b border-slate-300 items-center justify-center hover:cursor-pointer">
      <div className="flex w-6 h-6 bg-slate-300 rounded items-center justify-center group-hover:bg-blue-500 group-hover:w-32 group-hover:h-8 group-hover:transition-all duration-200 delay-100">
        <PlusIcon></PlusIcon>
        <p className="invisible group-hover:visible text-sm text-white group-hover:transition-all group-hover:delay-300">Add Account</p>
      </div>
    </div>
  );
}
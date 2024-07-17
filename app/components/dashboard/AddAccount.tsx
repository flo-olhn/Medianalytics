import PlusIcon from "../PlusIcon";

export default function AddAccount() {
  return (
    <div id="add-account" className="group group/a flex w-full h-16 items-center justify-center">
      <div className="flex w-6 h-6 bg-slate-300 rounded items-center justify-center group-hover/btn:bg-blue-500 text-gray-500 group-hover/btn:delay-0 group-hover:w-32 group-hover:h-8 group-hover:transition-all duration-300 group-hover:delay-100 delay-0">
        <PlusIcon></PlusIcon>
        <p className="invisible group-hover:visible text-sm group-hover/a:text-white group-hover/a:transition-all group-hover/a:duration-0 group-hover:transition-all group-hover:delay-300 group-hover/btn:delay-300 group-hover/btn:duration-100 delay-0">Add Account</p>
      </div>
    </div>
  );
}
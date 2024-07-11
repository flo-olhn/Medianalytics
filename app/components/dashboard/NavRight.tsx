/*
TODO: fix issue next-auth jwt_session_error decryption operation failed
      causing app to reload to home page
*/

export default function NavRight() {
  return (
    <div className="absolute w-16 h-[calc(100%_-_4rem)] bg-white border-l border-slate-300 bottom-0 right-0 hover:w-40 transition-all duration-300">
      <div id="add-account" className="group flex w-full h-16 border-b border-slate-300 items-center justify-center hover:cursor-pointer">
        <div className="flex w-6 h-6 bg-slate-200 rounded items-center justify-center group-hover:bg-blue-500 group-hover:w-32 group-hover:h-8 group-hover:transition-all duration-200 delay-100">
          <p className="absolute group-hover:invisible group-hover:delay-0 delay-300">+</p>
          <p className="invisible group-hover:visible text-sm text-white group-hover:transition-all group-hover:delay-300">Add Account</p>
        </div>
      </div>
    </div>
  );
}
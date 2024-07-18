export default function AccountInsights() {
  return (
    <div className="flex justify-center text-sm w-[calc(100%_-_8rem)] h-16 border-b border-slate-300">
      <div className="flex flex-col justify-center h-full w-40 border-x border-slate-300">
        <p className="flex self-center top-0">Followers</p>
        <p className="flex self-center text-xl">0</p>
      </div>
      <div className="flex flex-col justify-center h-full w-40">
        <p className="flex self-center top-0">Impressions</p>
        <p className="flex self-center text-xl">0</p>
      </div>
      <div className="flex flex-col justify-center h-full w-40 border-l border-slate-300">
        <p className="flex self-center top-0">Reach</p>
        <p className="flex self-center text-xl">0</p>
      </div>
      <div className="flex flex-col justify-center h-full w-40 border-x border-slate-300">
        <p className="flex self-center top-0">Profile Views</p>
        <p className="flex self-center text-xl">0</p>
      </div>
    </div>
  );
}
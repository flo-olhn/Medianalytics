export default function AccountInsights(props: { accounts: any[]; followers: number; }) {
  var f_cnt: number = 0;
  var imp = 0;
  var reach = 0;
  var p_views = 0;
  props.accounts.forEach((account) => {
    if (account.selected) {
      if (account.follower_cnt !== null) {
        f_cnt = account.follower_cnt;
      }
      imp = account.impressions;
      reach  = account.reach;
      p_views = account.profile_views;
    }
  });
  return (
    <div className="flex justify-center text-sm w-[calc(100%_-_8rem)] h-16 border-b border-slate-300">
      <div className="flex flex-col justify-center h-full w-40 border-x border-slate-300">
        <p className="flex self-center top-0">Followers</p>
        <p className="flex self-center text-xl">{props.followers}</p>
      </div>
      <div className="flex flex-col justify-center h-full w-40">
        <p className="flex self-center top-0">Impressions</p>
        <p className="flex self-center text-xl">{imp}</p>
      </div>
      <div className="flex flex-col justify-center h-full w-40 border-l border-slate-300">
        <p className="flex self-center top-0">Reach</p>
        <p className="flex self-center text-xl">{reach}</p>
      </div>
      <div className="flex flex-col justify-center h-full w-40 border-x border-slate-300">
        <p className="flex self-center top-0">Profile Views</p>
        <p className="flex self-center text-xl">{p_views}</p>
      </div>
    </div>
  );
}
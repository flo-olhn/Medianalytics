export default function AccountInsights(props: { accounts: any[]; followers: number; }) {
  /*function formatNumber(n: number, d=2) {
    var x = ('' + n).length;
    var p = Math.pow;
    d = p(10, d);
    x -= x % 3;
    return Math.round(n * d / p(10, x)) / d + " kMB" [x/3];
  };*/
  function formatNumber(num: number): string {
    if (num < 1000) {
      return num.toString();
    } else if (num >= 1000 && num < 1000000) {
      const formatted = (num / 1000).toFixed(2);
      return parseFloat(formatted) === 1000
        ? '1M'
        : formatted.replace(/\.?0+$/, '') + 'k';
    } else if (num >= 1000000 && num < 1000000000) {
      const formatted = (num / 1000000).toFixed(2);
      return parseFloat(formatted) === 1000
        ? '1B'
        : formatted.replace(/\.?0+$/, '') + 'M';
    } else if (num >= 1000000000) {
      const formatted = (num / 1000000000).toFixed(2);
      return formatted.replace(/\.?0+$/, '') + 'B';
    }
    return num.toString(); // Just in case
  }

  var f_cnt: number = 0;
  var imp = 0;
  var reach = 0;
  var p_views = 0;
  var imp_yday = 0;
  var reach_yday = 0;
  var p_views_yday = 0;

  props.accounts.forEach((account) => {
    if (account.selected) {
      if (account.follower_cnt !== null) {
        f_cnt = account.follower_cnt;
      }
      imp = account.impressions;
      reach  = account.reach;
      p_views = account.profile_views;
      imp_yday = account.impressions_yday;
      reach_yday  = account.reach_yday;
      p_views_yday = account.profile_views_yday;
    }
  });
  return (
    <div className="flex justify-center text-sm w-[calc(100%_-_8rem)] h-16 border-b border-slate-300">
      <div className="flex flex-col justify-center h-full w-40 border-x border-slate-300">
        <p className="flex self-center text-slate-400">Followers</p>
        <p className="flex self-center text-xl">{formatNumber(props.followers)}</p>
      </div>
      <div className="flex flex-col justify-center h-full w-40">
        <p className="flex self-center text-slate-400">Impressions</p>
        <div className="flex self-center justify-center text-xl">{formatNumber(imp)}
        {(imp - imp_yday >= 0) ?
          ((imp - imp_yday != 0) ? 
          <p className="flex self-center ml-2 text-xs text-green-500">+{formatNumber(imp - imp_yday)}</p> :
          <p className="flex self-center ml-2 text-xs text-slate-400">=</p>
        ) :
          <p className="flex self-center ml-2 text-xs text-red-500">{formatNumber(imp - imp_yday)}</p>
        }
        </div>
      </div>
      <div className="flex flex-col justify-center h-full w-40 border-l border-slate-300">
        <p className="flex self-center text-slate-400">Reach</p>
        <div className="flex self-center text-xl">{formatNumber(reach)}
        {(reach - reach_yday >= 0) ?
          ((reach - reach_yday != 0) ? 
          <p className="flex self-center ml-2 text-xs text-green-500">+{formatNumber(reach - reach_yday)}</p> :
          <p className="flex self-center ml-2 text-xs text-slate-400">=</p>
        ) :
          <p className="flex self-center ml-2 text-xs text-red-500">{formatNumber(reach - reach_yday)}</p>
        }
        </div>
      </div>
      <div className="flex flex-col justify-center h-full w-40 border-x border-slate-300">
        <p className="flex self-center text-slate-400">Profile Views</p>
        <div className="flex self-center text-xl">{formatNumber(p_views)}
        {(p_views - p_views_yday >= 0) ?
          ((p_views - p_views_yday != 0) ? 
            <p className="flex self-center ml-2 text-xs text-green-500">+{formatNumber(p_views - p_views_yday)}</p> :
            <p className="flex self-center ml-2 text-xs text-slate-400">=</p>
          ) :
          <p className="flex self-center ml-2 text-xs text-red-500">{formatNumber(p_views - p_views_yday)}</p>
        }
        </div>
      </div>
    </div>
  );
}
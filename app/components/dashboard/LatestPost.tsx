import Image from "next/image";

export default function LatestPost(props: { lpi: any; }) {
  const data = props.lpi;
  return (
    <div className="absolute flex left-16 top-20 w-9/12 h-80 bg-white border border-slate-300">
      <div className="flex flex-col items-center w-80 h-80 border-r border-slate-300">
        <div className="flex justify-center items-center w-full h-12 bg-white border-b border-slate-300">Latest Post</div>
        <div className="relative translate-y-4 flex justify-center items-center self-center w-11/12 h-3/4">
          {Object.keys(data).length !== 0 ?
            <Image src={data.media_url} width={320} height={320} alt='' priority className="h-auto w-auto object-contain"/> :
            <Image src={''} width={320} height={320} alt='' priority className="h-auto w-auto object-contain"/>
          }
        </div>
        
      </div>
      <div className="flex items-center justify-center w-full h-12 border-b border-slate-300">
        <div className="flex flex-col items-center justify-center w-1/2 h-full border-r border-slate-300 text-sm">
          <p>Likes</p>
          <p>{data.like_count}</p>
        </div>
        <div className="flex flex-col items-center justify-center w-1/2 h-full text-sm">
          <p>Comments</p>
          <p>{data.comments_count}</p>
        </div>
        
      </div>
    </div>
  );
}
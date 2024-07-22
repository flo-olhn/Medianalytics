import Image from "next/image";

export default function LatestPost(props: { lpi: {}; }) {
  const data = props.lpi;
  return (
    <div className="absolute left-16 top-20 w-9/12 h-80 bg-white border border-slate-300">
      <div className="flex flex-col items-center w-80 h-80 border-r border-slate-300">
        <div className="flex justify-center items-center w-full h-12 bg-white border-b border-slate-300">Latest Post</div>
        <Image src={data.media_url} width={320} height={320} alt='' className="flex self-center justify-center items-center h-full w-11/12 object-contain"/>
      </div>
    </div>
  );
}
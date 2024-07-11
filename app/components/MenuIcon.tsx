export default function MenuIcon() {
  return (
    <div className="relative w-6 h-6">
      <div className="w-full h-1 bg-slate-300 rounded group-hover:bg-blue-500 transition-all duration-300"></div>
      <div className="absolute top-1/2 -translate-y-1/2 translate-x-1 w-4 h-1 bg-slate-300 rounded group-hover:w-8 group-hover:-translate-x-1 group-hover:bg-blue-500 transition-all duration-300"></div>
      <div className="absolute bottom-0 w-full h-1 bg-slate-300 rounded group-hover:bg-blue-500 transition-all duration-300"></div>
    </div>
  );
}
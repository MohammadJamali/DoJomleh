import { useKBar } from "kbar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Dictionary } from "@/lib/dictionary-types";


export const KbarInput = ({ localization }: {localization: Dictionary}) => {
  const { query } = useKBar();

  const onClick = () => {
    query.toggle();
  };

  return (
    <button
      onClick={onClick}
      className="
      w-10 lg:w-36 h-10 border-[1px] 
      bg-white rounded-full font-medium
      border-slate-200 text-slate-500 
      hover:text-slate-700 hover:bg-slate-200">
      <div className="flex items-center justify-center lg:justify-start">
        <MagnifyingGlassIcon className="
        w-7 h-7 text-current bg-indigo-500 
        text-white p-1 lg:mx-2 rounded-full" 
        />
        <span className="hidden lg:inline ">
          {localization.header.search} (⌘K)
        </span>
      </div>
    </button>
  );
};

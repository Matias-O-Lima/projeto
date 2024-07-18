'use client'

import { firstLastLetter } from "@/lib/utils";
import { useStore } from "@/store/useStore";

export function Avatar() {
  const { user } = useStore();

  return (
    <>
      <div className="flex items-center gap-3 p-5 h-20 w-auto rounded hover:brightness-125 cursor-pointer">
        <div className="h-[50px] w-[50px] rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[1px]">
          <div className="flex h-full w-full rounded-full items-center justify-center bg-zinc-950 back p-3">
            <h1 className="text-md font-black text-white">
              {firstLastLetter(user.name ?? "F")}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full pt-5">
        <h1 className="text-sm font-bold">{user.name ?? "..."}</h1>
        <span className="text-xs text-slate-300">Campeão I</span>
      </div>
    </>
  );
}

"use client"
import React from 'react';

import { LogOut } from 'lucide-react';

import { onExit } from '@/store/useStore';

const Logout = ({ active }: any) => {
  return (
    <>
      <div
        onClick={(e) => {
          onExit();
        }}
        style={{ cursor: "pointer" }}
        className={`flex gap-2 items-center ease-in-out duration-150 ${
          active === "leave" ? "border-l-4 border-white" : ""
        } ease-in-out pl-5 h-9 text-sm font-regular text-[#5e6d7c] hover:border-l-4 hover:border-white`}
      >
        <LogOut size={20} /> Desconectar
      </div>
    </>
  );
};
export { Logout };

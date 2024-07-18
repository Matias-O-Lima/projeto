import {
  Boxes,
  Home,
  Settings2,
  ShoppingCart,
} from 'lucide-react';
import Link from 'next/link';

import { Logout } from '../client/on-logout';

interface AsideLinksProps {
  active: string;
}

export function AsideLinks({ active }: AsideLinksProps) {
  return (
    <>
      <h1 className="text-xs font-bold uppercase p-3 ">MEU PAINEL</h1>
      <Link
        href="/dashboard"
        className={`flex gap-2 items-center ease-in-out duration-150 ${
          active === "home"
            ? "border-l-4 border-white text-white"
            : "text-[#5e6d7c]"
        } ease-in-out pl-5 h-9 text-sm font-regular hover:border-l-4 hover:border-white`}
      >
        <Home size={20} /> Home
      </Link>
      <Link
        href="/dashboard/communities"
        className={`flex gap-2 items-center ease-in-out duration-150 ${
          active === "communities"
            ? "border-l-4 border-white text-white"
            : "text-[#5e6d7c]"
        } ease-in-out pl-5 h-9 text-sm font-regular hover:border-l-4 hover:border-white`}
      >
        <Boxes size={20} /> Comunidades
      </Link>
      <Link
        href="/dashboard/marketplace"
        className={`flex gap-2 items-center ease-in-out duration-150 ${
          active === "marketplace"
            ? "border-l-4 border-white text-white"
            : "text-[#5e6d7c]"
        } ease-in-out pl-5 h-9 text-sm font-regular hover:border-l-4 hover:border-white`}
      >
        <ShoppingCart size={20} /> Marketplace
      </Link>
      <h1 className="text-xs font-bold uppercase p-3 ">OUTROS</h1>
      <Link
        href="/dashboard/my-account"
        className={`flex gap-2 items-center ease-in-out duration-150 ${
          active === "account" ? "border-l-4 border-white" : ""
        } ease-in-out pl-5 h-9 text-sm font-regular text-[#5e6d7c] hover:border-l-4 hover:border-white`}
      >
        <Settings2 size={20} /> Minha conta
      </Link>
      <Logout active={active} />
    </>
  );
}

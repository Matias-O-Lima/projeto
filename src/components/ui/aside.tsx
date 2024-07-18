import Link from 'next/link';

import { AsideLinks } from './aside-links';
import { Avatar } from './avatar';

interface AsideProps {
  active: string;
}

export function Aside({ active }: AsideProps) {
  return (
    <aside
      className={`flex flex-col transition-all duration-300 w-[280px] max-w-[280px] ease-in-out border-r-[1px bg-zinc-950 border-r-[1px] border-r-[#16161e] `}
    >
      <div className="flex items-center justify-center w-full p-4 h-20  mt-5">
        <img
          src="/assets/logo.svg"
          alt="Website Logo"
          className="max-w-[230px]"
        />
      </div>
      <Link href={"/dashboard/my-account"}>
        <div className="flex h-24 mt-10">
          <Avatar />
        </div>
      </Link>

      <main className="block w-full mt-7">
        <nav className="flex flex-col gap-5">
          <AsideLinks active={active} />
        </nav>
      </main>
    </aside>
  );
}

export default Aside;

import { Youtube, Instagram, Facebook, Twitter } from "lucide-react";

interface ListHeaderProps {
  title: string;
  icon: React.ReactNode;
}

export function ListHeader({ title, icon }: ListHeaderProps) {
  return (
    <section className="flex w-full">
      <h1 className="font-semibold text-lg flex items-center gap-2 pb-5">
        {icon}
        {title}
      </h1>
    </section>
  );
}

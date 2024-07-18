"use client";

import { useStore } from "@/store/useStore";
import { Button } from "./ui/button";

interface SliderTitleProps {
  description: string;
  isButton: boolean;
}

export function SliderAdvertising({ description }: SliderTitleProps) {
  const { user } = useStore();

  return (
    <article className="flex flex-col justify-end p-16 min-h-[500px] max-h-[500px]">
      <div className="flex flex-col gap-2 z-40">
        <h1 className="text-4xl font-bold">{`Olá ${user?.name ?? ""}.`}</h1>
        <p className="text-gray-300 text-lg">{description}</p>
        <div className="flex w-52">
          <Button className="w-full mt-3">Explorar comunidades</Button>
        </div>
      </div>
    </article>
  );
}

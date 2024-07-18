import {
  ChevronDown,
  Film,
} from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { formatTime } from '@/lib/date';

interface IListModuleClassesProps {
  moduleName: string;
  quantityClasses: number;
  minutesTotal: string;
  setVideoId(_: any): void;
  videoId: string;
  play: string;
  videos: {
    id: string;
    url: string;
    title: string;
    durationTimeMinutes: number;
    description: string;
  }[];
}

export function ListModuleClasses({
  moduleName,
  quantityClasses,
  videoId,
  videos,
  setVideoId,
  minutesTotal,
}: IListModuleClassesProps) {
  return (
    <Collapsible>
      <CollapsibleTrigger className="flex bg-[#202024] w-full min-h-14 p-5">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-md">{moduleName}</h1>
            <div className="flex text-xs">
              <span>
                {quantityClasses} aulas - {minutesTotal}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <ChevronDown />
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-8">
        <section className="flex flex-col gap-5">
          {videos?.map((res: any, i: number) => {
            return (
              <div
                key={i}
                className="flex items-center justify-between text-sm"
              >
                <div
                  className={`flex items-center cursor-pointer gap-1 ${
                    res.id == videoId ? "text-purple-500" : "text-white"
                  } font-medium`}
                >
                  <Film size={15} />
                  <p
                    onClick={() => {
                      setVideoId(res?.id);
                    }}
                  >
                    {res?.title}
                  </p>
                </div>
                <span className="text-slate-400">
                  {formatTime(res?.durationTimeMinutes)}
                </span>
              </div>
            );
          })}
        </section>
      </CollapsibleContent>
    </Collapsible>
  );
}

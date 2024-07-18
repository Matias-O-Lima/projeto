import Link from 'next/link';

import { CurrentTimeVideo } from '../current-time-video';

interface CardWatchAgain {
  path: string;
  currentProgressVideo: number;
  currentVideo: string;
  id: string;
  courseId: string;
  course: string;
}

export function CardWatchAgain({
  path = "",
  id = "",
  currentProgressVideo = 0,
  course = "",
  courseId = "",
  currentVideo = "",
}: CardWatchAgain) {
  return (
    <>
      <Link className="flex flex-col cursor-pointer hover:brightness-150 transition duration-300 ease-in-out" href={`/dashboard/course/${courseId}?videoId=${id}`}>
        <section className="h-auto relative">
          <img src={path} alt="Banner da aula" className="max-w-64" />
          <div className="absolute bottom-0 w-full">
            <CurrentTimeVideo porcent={currentProgressVideo} />
          </div>
        </section>
        <section className="flex flex-col pt-3">
          <span className="text-slate-400 text-xs uppercase">{course}</span>
          <h1 className="font-semibold text-md">{currentVideo}</h1>
        </section>
      </Link>
    </>
  );
}

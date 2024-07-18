"use client";
import { Youtube } from 'lucide-react';
import { useQuery } from 'react-query';

import api from '@/lib/api';
import { useToken } from '@/store/useStore';

import { CardWatchAgain } from '../cards/card-watch-again';
import { LoadingScreen } from '../ui/loading-screen';
import { ListHeader } from './list-header';

export function ListWatchAgain() {
  const { token } = useToken();
  async function listCourse() {
    const response = await api.get(`/course/keep-to-play`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  const { data, isLoading, isRefetching } = useQuery({
    queryFn: listCourse,
    queryKey: "keep-watch",
  });

  if (data?.length > 0) {
    return (
      <>
        {isLoading  && !isRefetching && <LoadingScreen />}
        <ListHeader title="Continue onde você parou" icon={<Youtube />} />
        <div className="overflow-x-scroll whitespace-nowrap no-scrollbar">
          <div className="flex items-center gap-5 w-32">
            {data?.map((res: any, i: number) => {
              return (
                <CardWatchAgain
                  key={i}
                  id={res.id}
                  path={res?.thumb?.url}
                  courseId={res?.courseId}
                  course={res?.courseTitle}
                  currentVideo={res?.title}
                  currentProgressVideo={res.progress}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
  return <></>;
}

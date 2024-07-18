"use client";
import { LayoutGrid } from 'lucide-react';
import { useQuery } from 'react-query';

import api from '@/lib/api';
import { useToken } from '@/store/useStore';

import { CardCourse } from '../cards/card-course';
import { LoadingScreen } from '../ui/loading-screen';
import { ListHeader } from './list-header';

export function ListMyCourses() {
  const { token } = useToken();

  async function listCourse() {
    const response = await api.get(`/course`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  const { data, isLoading, isRefetching } = useQuery({
    queryFn: listCourse,
    queryKey: "courses",
  });
  return (
    <>
      {isLoading && !isRefetching && <LoadingScreen />}
      <div className="mt-16">
        <ListHeader title="Meus cursos" icon={<LayoutGrid />} />
        <div className="overflow-x-scroll whitespace-nowrap no-scrollbar">
          <div className="flex items-center gap-5 w-96">
            {data?.map((res: any, i: number) => {
              return (
                <CardCourse
                  id={res.id}
                  url={res.CourseThumb[0].img.url}
                  key={i}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

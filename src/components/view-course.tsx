"use client";

import { useCallback, useEffect, useState } from "react";

import { ListVideo, Play } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ViewLayout } from "@/layout/view-layout";
import api from "@/lib/api";
import { formatTime } from "@/lib/date";
import { delay } from "@/lib/utils";
import { useToken } from "@/store/useStore";

import { ListModuleClasses } from "./lists/list-module-classes";
import { Button } from "./ui/button";
import { LoadingScreen } from "./ui/loading-screen";
import { VideoPlayer } from "./ui/player";

interface Props {
  id: string;
}

const ViewCourse = ({ id }: Props) => {
  const { token } = useToken();

  const searchParams = useSearchParams();

  const searchVideoId = searchParams.get("videoId");

  async function listCourse() {
    const response = await api.get(`/course/play/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  async function listPlayer(searchVideoId0?: string) {
    const response = await api.get(
      `/course/play-get-player/${id}${
        searchVideoId0 ? `?videoId=${searchVideoId0}` : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
  const [load, setLoad] = useState(false);
  const [play, setPlay] = useState(null);
  const [videoId, setVideoId] = useState<string>(searchVideoId ?? "");
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [done, setDone] = useState(false);
  const [porcent, setPorcent] = useState<number>(0);
  const { data, isLoading: isLodingC } = useQuery({
    queryFn: listCourse,
    queryKey: `course-${id}`,
    refetchOnWindowFocus: false,
  });

  const { isLoading, refetch } = useQuery({
    queryFn: () => listPlayer(videoId),
    queryKey: `course-play-${videoId}`,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setTotalDuration(data.video?.durationTimeMinutes);
      setPlay(data.video?.url);
      setPorcent(data.porcent);
      setDone(data.isConcluded);
      setVideoId(data.video?.id);
    },
  });

  async function markDoneORunset(done0: boolean) {
    const response = await api.put(
      `/course/set-and-unsed-concluded/${videoId}/${done0}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }

  useEffect(() => {
    if (videoId) {
      setLoad(false);
      refetch().finally(async () => {
        await delay(1000);
        setLoad(true);
      });
    }
  }, [videoId]);
  const renderVideo = useCallback(() => {
    return (
      <>
        {!!play && videoId?.length > 0 && totalDuration > 0 && (
          <VideoPlayer
            totalDuration={totalDuration}
            key={play}
            porcent={porcent}
            videoId={videoId}
            src={play}
          />
        )}
      </>
    );
  }, [isLoading, isLodingC, videoId, play, porcent, done, totalDuration]);

  return (
    <>
      {!load && <LoadingScreen />}
      <ViewLayout disableHistoryRoute={true} itemActive="home">
        <div className="grid grid-cols-3">
          <section className="col-span-2">
            {renderVideo()}
            <div className="flex w-full items-center gap-3 justify-end h-5 p-8 pr-3 bg-[#202024]">
              <Button
                onClick={() => {
                  markDoneORunset(!done);
                  setDone((e) => !e);
                }}
                disabled={false}
                size="sm"
                className={!done ? "bg-[#FFF]" : "bg-[#6C0BA9] text-white"}
              >
                {done ? "Aula concluída" : "Marcar como concluida"}
              </Button>
            </div>
            <div id="videoDetails" className="flex flex-col pt-10">
              <h1 className="text-xl uppercase font-bold">
                {data?.course?.title}
              </h1>
              {data?.course?.description}
            </div>
          </section>
          <div className="flex flex-col bg-[#19191c] col-span-1 max-h-[40.5rem]">
            <Tabs defaultValue="list-videos" className="w-full">
              <TabsList className="w-full bg-transparent">
                <TabsTrigger value="list-videos" className="w-full">
                  <Play size={20} />
                </TabsTrigger>
                <TabsTrigger value="materials" className="w-full">
                  <ListVideo size={20} />
                </TabsTrigger>
              </TabsList>
              <TabsContent value="list-videos">
                <div className="flex flex-col w-full gap-1 h-full max-h-[700px] overflow-y-auto">
                  {videoId !== null &&
                    play !== null &&
                    data?.groupVideos?.map((res: any, i: number) => {
                      return (
                        <ListModuleClasses
                          key={i}
                          setVideoId={setVideoId}
                          videoId={videoId}
                          play={play}
                          moduleName={res?.title}
                          videos={res.Video}
                          minutesTotal={formatTime(res?.minutesTotal)}
                          quantityClasses={res.Video.length}
                        />
                      );
                    })}
                </div>
              </TabsContent>
              <TabsContent value="materials"></TabsContent>
            </Tabs>
          </div>
        </div>
      </ViewLayout>
    </>
  );
};

export default ViewCourse;

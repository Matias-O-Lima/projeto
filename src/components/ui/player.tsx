"use client";

import React, {
  useEffect,
  useRef,
} from 'react';

import { debounce } from 'lodash';
import Plyr from 'plyr';

import api from '@/lib/api';
import { delay } from '@/lib/utils';
import {
  useStore,
  useToken,
} from '@/store/useStore';

interface IVideoPlayerProps {
  src: string;
  videoId?: string;
  key: string;
  porcent?: number;
  totalDuration: number;
}

export function VideoPlayer({
  src,
  key,
  videoId,
  porcent,
  totalDuration,
}: IVideoPlayerProps) {
  const player = useRef(null);
  const { user } = useStore();
  const { token } = useToken();
  console.log("duration", totalDuration);
  const getCurrentMinuteFromPercentage = (
    percentage: number,
    totalDuration: number
  ) => {
    if (totalDuration <= 0) {
      return 0; // Retorna 0 se a duração total for zero ou negativa
    }
    if (porcent == 0 || porcent == 100) {
      return 0;
    }
    let currentMinute = (percentage / 100) * totalDuration;
    return currentMinute; // Arredonda para o minuto mais próximo
  };

  const setProgress = async (time: number) => {
    if(time == 0) return;
    try {
      await api.put(
        `/course/current-time`,
        {
          userId: user.id,
          videoId: videoId,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (player.current && !!user) {
      const plyrInstance = new Plyr(player.current, {
        volume: 0.1,
      });

      plyrInstance.source = {
        type: "video",
        sources: [
          {
            src: src,
            provider: "vimeo",
          },
        ],
      };

      plyrInstance.on("ready", async () => {
        plyrInstance.currentTime =
          getCurrentMinuteFromPercentage(porcent ?? 0, totalDuration) * 60;
        await delay(2000);
        plyrInstance.play();
      });

      plyrInstance.on("ended", () => {});

      plyrInstance.on(
        "timeupdate",
        debounce(() => {
          console.log("curent", plyrInstance.currentTime);
          setProgress(plyrInstance.currentTime / 60);
        }, 300)
      );
    }
  }, [user]);

  return (
    <div>
      <video key={key} controls ref={player} />
    </div>
  );
}

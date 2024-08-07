"use client";

import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { useState, useEffect } from "react";

import { Song } from "@/types";

import Slider from "./Slider";
import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import Input from "./Input";
import usePlayer from "@/hooks/usePlayer";

import useSound from "use-sound";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    // Start playing the sound
    sound?.play();

    // Set up an interval to update the current time every second
    const interval = setInterval(() => {
      if (sound?.playing()) {
        const duration = sound.duration();
        setDuration(duration);
        setCurrentTime(sound.seek());
      }
    }, 1000);

    // Clean up when the component is unmounted or when the `sound` object changes
    return () => {
      // Stop the interval
      clearInterval(interval);

      // Unload the sound
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  const formatTime = (seconds: number): string => {
    // Convert the seconds to minutes and remainder seconds
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = Math.floor(seconds % 60);

    // Format the minutes and seconds as two-digits numbers
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainderSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4 max-w-[188px]">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-start">
        <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={24}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
          <div
            onClick={handlePlay}
            className="flex items-center justify-center h-8 w-8 rounded-full bg-white p-1 cursor-pointer"
          >
            <Icon size={24} className="text-black" />
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={24}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
        </div>
        <div className="w-full hidden md:flex justify-between">
          <div className="w-20 text-left">{formatTime(currentTime)}</div>
          <div className="w-full">
            <input
              type="range"
              min={0}
              max={duration}
              value={isDragging ? undefined : currentTime}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onChange={(e) => {
                const newTime = Number(e.target.value);
                setCurrentTime(newTime);
                sound.seek(newTime);
              }}
              className="w-full h-1 bg-gray-200 rounded-none dark:bg-gray-700"
            />
          </div>
          <div className="w-20 text-right">{formatTime(duration)}</div>
        </div>
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer text-white"
            size={34}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;

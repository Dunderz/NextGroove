"use client";

import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { useState, useEffect } from "react";

import { Song } from "@/types";

import Slider from "./Slider";
import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import usePlayer from "@/hooks/usePlayer";

import useSound from "use-sound";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  return <div>PlayerContent</div>;
};

export default PlayerContent;

"use client";

import { Sound } from "@/types";
import { useEffect, useState } from "react";

interface ProgressBarProps {
  sound: Sound;
  duration: number;
  currentTime: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  sound,
  duration,
  currentTime,
}) => {
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
    <div className="w-full flex justify-between">
      <div>{formatTime(currentTime)}</div>
      <div>Bar</div>
      <div>{formatTime(duration)}</div>
    </div>
  );
};

export default ProgressBar;

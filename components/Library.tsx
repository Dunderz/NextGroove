"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
// import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import MediaItem from "./MediaItem";
import { Song } from "@/types";

interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();

  // const onPlay = useOnPlay();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  };
  return (
    <div>
      <MediaItem></MediaItem>
    </div>
  );
};

export default Library;

import ModalVideo from "react-modal-video";
import React from "react";
import { Video } from "@/interfaces/Media";
import { findTrailer } from "@/lib/utils";

interface TrailerPlayerProps {
  videos: Video[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const TrailerPlayer: React.FC<TrailerPlayerProps> = ({
  videos,
  isOpen,
  setIsOpen
}) => {
  const trailer = findTrailer(videos);
  if (!trailer) return null;
  return (
    <>
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId={trailer.key}
        onClose={() => setIsOpen(false)}
        youtube={{
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
          controls: 1
        }}
      />
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-[1000]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default TrailerPlayer;

import ModalVideo from "react-modal-video";
import { findTrailer } from "@/lib/utils";
import { trailerAtom } from "@/atoms/trailerAtom";
import { useAtom } from "jotai";
import { useTrailer } from "@/hooks/useTrailer";

const TrailerPlayer = () => {
  const [{ isOpen, videos }] = useAtom(trailerAtom);
  const { hideTrailer } = useTrailer();

  const trailer = findTrailer(videos);
  if (!trailer || !isOpen) return null;
  return (
    <>
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId={trailer.key}
        onClose={hideTrailer}
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
          onClick={hideTrailer}
        />
      )}
    </>
  );
};

export default TrailerPlayer;

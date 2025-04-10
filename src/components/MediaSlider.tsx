import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

interface MediaSliderProps {
  children: React.ReactNode[];
  title?: string;
  itemsPerPage?: number;
}
const MediaSlider: React.FC<MediaSliderProps> = ({
  children,
  title,
  itemsPerPage = window.innerWidth >= 768 ? 3 : 2
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);
  const totalItems = children.length;

  useEffect(() => {
    setShowPrevButton(currentIndex > 0);
    setShowNextButton(currentIndex + itemsPerPage < totalItems);
  }, [currentIndex, itemsPerPage, totalItems]);

  const handleNext = () => {
    if (currentIndex + itemsPerPage < totalItems) {
      setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
    }
  };

  return (
    <section className="mb-6 ms:mb-20">
      {title && (
        <h2 className="text-white text-[20px] ms:text-[32px] -tracking-[0.31] ms:tracking-[unset] mb-4 ms:mb-[25px] font-light">
          {title}
        </h2>
      )}
      <div className="relative group">
        {/* Navigation Buttons */}
        {showPrevButton && (
          <button
            onClick={handlePrev}
            className="hidden ms:block   absolute left-0 top-0 z-50 bg-black/70 ms:p-2 h-full 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeft className="w-7 h-7 ms:w-11 ms:h-11 text-white" />
          </button>
        )}

        {showNextButton && (
          <button
            onClick={handleNext}
            className="hidden ms:block absolute right-0 top-0  z-50 bg-black/70 ms:p-2 h-full 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronRight className="w-7 h-7 ms:w-11 ms:h-11 text-white" />
          </button>
        )}
        {/* Media Container */}
        <div className="overflow-scroll ms:overflow-hidden no-scrollbar ">
          <div
            className="flex transition-transform duration-500 ease-out gap-4 ms:gap-10"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaSlider;

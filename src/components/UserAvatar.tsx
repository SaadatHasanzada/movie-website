import "react-loading-skeleton/dist/skeleton.css";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React, { forwardRef, useEffect, useRef, useState } from "react";

import Skeleton from "react-loading-skeleton";

interface UserAvatarProps
  extends React.ComponentPropsWithoutRef<typeof Avatar> {
  imageUrl?: string;
  email?: string;
  isLoading?: boolean;
}

// Create useCallback unction for the event fired functionality
const UserAvatar = forwardRef<React.ElementRef<typeof Avatar>, UserAvatarProps>(
  ({ imageUrl, email, isLoading = false, className = "", ...props }, ref) => {
    const avatarFallback = email?.charAt(0).toUpperCase();
    const [imgLoading, setImgLoading] = useState(true);
    const [imgError, setImgError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    // Reset states when imageUrl changes
    useEffect(() => {
      if (imageUrl) {
        setImgLoading(true);
        setImgError(false);
      }
    }, [imageUrl]);

    useEffect(() => {
      if (imgRef.current && imgRef.current.complete && imageUrl) {
        handleImageLoad();
      }
    }, [imageUrl]);

    const handleImageLoad = () => {
      setImgLoading(false);
    };

    const showSkeleton = isLoading || (imageUrl && imgLoading);
    const showFallback = !imageUrl || imgError;
    return (
      <>
        <img
          ref={imgRef}
          className="w-full h-full hidden"
          src={imageUrl}
          onLoad={handleImageLoad}
        />
        <Avatar
          ref={ref}
          className={`${
            showSkeleton ? "" : "bg-dusk_blue"
          } flex items-center justify-center ${className}`}
          {...props}
        >
          {showSkeleton ? (
            <div className="h-full w-full leading-none">
              <Skeleton
                circle={true}
                baseColor="#5a6a90"
                height="100%"
                width="100%"
                duration={1}
              />
            </div>
          ) : showFallback ? (
            avatarFallback
          ) : (
            <AvatarImage
              ref={imgRef}
              className="w-full h-full object-cover"
              src={imageUrl}
              onLoad={handleImageLoad}
            />
          )}
        </Avatar>
      </>
    );
  }
);

UserAvatar.displayName = "UserAvatar";

export default UserAvatar;

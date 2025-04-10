import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogOut, UserRound } from "lucide-react";
import { authService, userService } from "@/features/auth/services/supabase";

import EditProfile from "@/features/profile/components/EditProfile";
import { NavLink } from "react-router-dom";
import React from "react";
import UserAvatar from "../UserAvatar";
import logo from "../../assets/logo.svg";
import style from "./style.module.scss";
import { useAsyncService } from "@/hooks/useAsyncService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Sidebar: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>();
  const [selectedFile, setSelectedFile] = useState<File | null>();

  const {
    data: user,
    loading: isUserImgLoading,
    execute: executeGetUser
  } = useAsyncService(userService.getUser);

  const handleDialogClose = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    setPreviewImage(null);
    setSelectedFile(null);
  };

  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await authService.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex bg-semi_dark_blue left-8 items-center justify-between lg:justify-normal lg:flex-col top-0 lg:top-8 z-[999] sticky ms:static lg:fixed rounded-none ms:rounded-[10px] lg:rounded-[20px] p-4 ms:pt-5 ms:pb-5  ms:pl-6 lg:pt-8 lg:pb-8 lg:pl-4 ms:mt-6 ms:ml-6 lg:mt-0 lg:ml-0 w-full ms:w-[calc(100%-48px)] lg:w-[96px] h-[56px] ms:h-[72px] lg:h-[calc(100vh-64px)]">
      <div className="flex w-[25px] h-5 ms:w-[unset] ms:h-[unset] lg:mb-[75px]">
        <img src={logo} alt="Movie logo" />
      </div>
      <ul className="w-full ms:w-[unset] justify-between max-w-[134px] lg:mb-auto flex lg:flex-col ms:gap-8 lg:gap-10 ">
        <li id={style.home} className="w-4 h-4 ms:w-5 ms:h-5">
          <NavLink
            className="group"
            to="/home"
            aria-label="Navigate to Home page"
          >
            <svg
              className="w-4 h-4 ms:w-5 ms:h-5"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z"
                className="fill-[#5A698F] transition-all duration-300 group-[.active]:fill-white group-hover:fill-[#FC4747]"
              />
            </svg>
          </NavLink>{" "}
        </li>
        <li id={style.movies} className="w-4 h-4 ms:w-5 ms:h-5">
          <NavLink
            className="group"
            to="/movies"
            aria-label="Navigate to Movies page"
          >
            <svg
              className="w-4 h-4 ms:w-5 ms:h-5"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z"
                className="fill-[#5A698F] transition-all duration-300 group-[.active]:fill-white group-hover:fill-[#FC4747]"
              />
            </svg>
          </NavLink>
        </li>
        <li id={style.series} className="w-4 h-4 ms:w-5 ms:h-5">
          <NavLink
            className="group"
            to="/series"
            aria-label="Navigate to Series page"
          >
            <svg
              className="w-4 h-4 ms:w-5 ms:h-5"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z"
                className="fill-[#5A698F] transition-all duration-300 group-[.active]:fill-white group-hover:fill-[#FC4747]"
              />
            </svg>
          </NavLink>
        </li>
        <li id={style.bookmarked} className="w-4 h-4 ms:w-5 ms:h-5">
          <NavLink
            className="group"
            to="/bookmarks"
            aria-label="Navigate to Bookmarks page"
          >
            <svg
              className="w-4 h-4 ms:w-5 ms:h-5"
              viewBox="0 0 17 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.387 0c.202 0 .396.04.581.119.291.115.522.295.694.542.172.247.258.52.258.82v17.038c0 .3-.086.573-.258.82a1.49 1.49 0 0 1-.694.542 1.49 1.49 0 0 1-.581.106c-.423 0-.79-.141-1.098-.423L8.46 13.959l-5.83 5.605c-.317.29-.682.436-1.097.436-.202 0-.396-.04-.581-.119a1.49 1.49 0 0 1-.694-.542A1.402 1.402 0 0 1 0 18.52V1.481c0-.3.086-.573.258-.82A1.49 1.49 0 0 1 .952.119C1.137.039 1.33 0 1.533 0h13.854Z"
                className="fill-[#5A698F] transition-all duration-300 group-[.active]:fill-white group-hover:fill-[#FC4747]"
              />
            </svg>
          </NavLink>
        </li>
      </ul>

      <Dialog onOpenChange={handleDialogClose}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <UserAvatar
              imageUrl={user?.user_metadata?.image}
              email={user?.email}
              isLoading={isUserImgLoading}
              className="h-8 w-8 ms:w-10 ms:h-10"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            side={
              typeof window !== "undefined" && window.innerWidth < 1025
                ? "bottom"
                : "right"
            }
            className="w-36 p-2  mr-4 ms:mr-10   bg-slate_blue border-none shadow-[rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px]  "
          >
            <DialogTrigger asChild>
              <DropdownMenuItem className="hover:!bg-white/25 cursor-pointer">
                <UserRound size={16} />
                Profile
              </DropdownMenuItem>
            </DialogTrigger>

            <DropdownMenuItem
              onClick={handleSignOut}
              className="hover:!bg-white/25 cursor-pointer"
            >
              <LogOut size={16} />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <EditProfile
          user={user}
          executeGetUser={executeGetUser}
          isUserImgLoading={isUserImgLoading}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      </Dialog>
    </div>
  );
};

export default Sidebar;

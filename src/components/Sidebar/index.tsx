import "react-loading-skeleton/dist/skeleton.css";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogOut, UserRound } from "lucide-react";
import { authService, userService } from "@/features/auth/services/supabase";

import { NavLink } from "react-router-dom";
import React from "react";
import Skeleton from "react-loading-skeleton";
import logo from "../../assets/logo.svg";
import style from "./style.module.scss";
import { useFetch } from "@/hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const { data: user, isLoading: isUserImgLoading } = useFetch(
    userService.getUser
  );
  const avatarFallback = user?.email?.charAt(0).toUpperCase();

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
    <div className={style.sidebar}>
      <div className={style.logo}>
        <img src={logo} alt="Movie logo" />
      </div>
      <ul className={style.navButtons}>
        <li id={style.home}>
          <NavLink to="/" aria-label="Navigate to Home page">
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z"
                fill="#5A698F"
              />
            </svg>
          </NavLink>{" "}
        </li>
        <li id={style.movies}>
          <NavLink to="/movies" aria-label="Navigate to Movies page">
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z"
                fill="#5A698F"
              />
            </svg>
          </NavLink>
        </li>
        <li id={style.series}>
          <NavLink to="/series" aria-label="Navigate to Series page">
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z"
                fill="#5A698F"
              />
            </svg>
          </NavLink>
        </li>
        <li id={style.bookmarked}>
          <NavLink to="/bookmarks" aria-label="Navigate to Bookmarks page">
            <svg viewBox="0 0 17 20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.387 0c.202 0 .396.04.581.119.291.115.522.295.694.542.172.247.258.52.258.82v17.038c0 .3-.086.573-.258.82a1.49 1.49 0 0 1-.694.542 1.49 1.49 0 0 1-.581.106c-.423 0-.79-.141-1.098-.423L8.46 13.959l-5.83 5.605c-.317.29-.682.436-1.097.436-.202 0-.396-.04-.581-.119a1.49 1.49 0 0 1-.694-.542A1.402 1.402 0 0 1 0 18.52V1.481c0-.3.086-.573.258-.82A1.49 1.49 0 0 1 .952.119C1.137.039 1.33 0 1.533 0h13.854Z"
                fill="#5A698F"
              />
            </svg>
          </NavLink>
        </li>
      </ul>

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Avatar
            className={`${
              isUserImgLoading ? "" : "bg-dusk_blue"
            } h-8 w-8 ms:w-10 ms:h-10`}
          >
            {user?.user_metadata?.image && isUserImgLoading ? (
              <Skeleton
                circle={true}
                baseColor="#5a6a90"
                height={40}
                width={40}
                containerClassName="flex-1 leading-none"
              />
            ) : (
              <AvatarImage src={user?.user_metadata?.image} />
            )}
            <AvatarFallback>
              {isUserImgLoading ? (
                <Skeleton
                  circle={true}
                  baseColor="#5a6a90"
                  height={40}
                  width={40}
                  containerClassName="flex-1 leading-none"
                />
              ) : (
                avatarFallback
              )}
            </AvatarFallback>
          </Avatar>
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
          <DropdownMenuItem
            onClick={() => navigate("/profile")}
            className="hover:!bg-white/25 cursor-pointer"
          >
            <UserRound size={16} />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleSignOut}
            className="hover:!bg-white/25 cursor-pointer"
          >
            <LogOut size={16} />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Sidebar;

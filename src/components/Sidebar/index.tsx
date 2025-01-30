import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { FormErrors, ProfileFormData } from "@/features/auth/types";
import { LogOut, UserRound } from "lucide-react";
import { authService, userService } from "@/features/auth/services/supabase";
import { useEffect, useRef, useState } from "react";
import {
  validateChangePassword,
  validateEmail,
  validateFileSize
} from "@/utils/validation";

import { Button } from "../ui/button";
import CircleMarker from "../ui/CircleMarker";
import { ERROR_MESSAGES } from "@/constants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import React from "react";
import UserAvatar from "../UserAvatar";
import logo from "../../assets/logo.svg";
import style from "./style.module.scss";
import { toast } from "react-toastify";
import { useAsyncService } from "@/hooks/useAsyncService";
import { useAuth } from "@/features/auth/hooks/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>();
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [fileErrorMessage, setFileErrorMessage] = useState<string | null>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
    password: ""
  });
  const {
    data: user,
    loading: isUserImgLoading,
    execute: executeGetUser
  } = useAsyncService(userService.getUser);
  const { loading: isDeleteLoading, execute: executeDeleteProfilePhoto } =
    useAsyncService(userService.deleteProfilePhoto, false);
  const { isUserUpdated } = useAuth();
  useEffect(() => {
    if (isUserUpdated) {
      executeGetUser();
    }
  }, [isUserUpdated]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.user_metadata.full_name || "",
        email: user.user_metadata.email || "",
        password: ""
      });
    }
  }, [user]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;
    const { isValid, errorMessage } = validateFileSize(file);

    if (isValid) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      setSelectedFile(file);
      setFileErrorMessage(null);
    } else {
      setFileErrorMessage(errorMessage);
    }
  };

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      if (field === "email") {
        const { errorMessage } = validateEmail(value);
        setErrors((prev) => ({ ...prev, email: errorMessage }));
      } else if (field === "password") {
        const { errorMessage } = validateChangePassword(value);
        setErrors((prev) => ({ ...prev, password: errorMessage }));
      }
    };

  const handleSaveChanges = async () => {
    const { name, email, password } = formData;
    console.log(name);
    console.log(errors);

    // If there are validation errors, set them and return
    if (errors.email || errors.password) {
      return;
    }
    try {
      setIsSaving(true);
      // Prepare update data
      const updateData: any = { email };
      // Add optional fields
      updateData.data = { full_name: name };
      if (password) updateData.password = password;
      if (selectedFile && user) {
        const uploadedUrl = await userService.uploadProfilePhoto({
          file: selectedFile,
          user
        });

        // Add uploaded image to update data
        if (uploadedUrl) {
          updateData.data = {
            ...(updateData.data || {}),
            image: uploadedUrl
          };
        }
      }
      // Update user profile
      console.log(updateData);
      await userService.updateUser(updateData);
      // Clean up
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }

      // Reset states
      setPreviewImage(undefined);
      setSelectedFile(undefined);
      toast("User data saved successfully", { type: "success" });
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        network: ERROR_MESSAGES.NETWORK_ERROR
      }));
      console.error("Profile update error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDialogClose = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    setPreviewImage(null);
    setSelectedFile(null);
  };

  const handleDeletePhoto = () => {
    if (!user) return;
    setPreviewImage(null);
    setSelectedFile(null);
    executeDeleteProfilePhoto(user);
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
        <DialogContent className="sm:max-w-[600px] bg-dark_blue border-semi_dark_blue">
          <DialogHeader className="mb-4">
            <DialogTitle>
              Hey{" "}
              <span className="underline decoration-wavy decoration-peach">
                {" "}
                {user?.user_metadata?.full_name || "Cinephile"}
              </span>
              , <CircleMarker text="update" /> your details{" "}
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-4 justify-between">
            <div className="flex gap-3 items-center">
              <UserAvatar
                imageUrl={previewImage || user?.user_metadata?.image}
                email={user?.email}
                isLoading={isUserImgLoading}
                className="h-8 w-8 ms:w-20 ms:h-20 text-2xl "
              />
              <div className="max-w-28 space-y-2">
                <p className="text-xs text-gray-500 italic ">
                  Image should be less than 300KB
                </p>
                {fileErrorMessage && (
                  <p className="text-xs text-red-500 italic">
                    {fileErrorMessage}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <Button
                className=" bg-slate_blue hover:bg-slate_blue/70"
                onClick={() => fileInputRef.current?.click()}
              >
                Change picture
              </Button>
              <Button
                onClick={() => handleDeletePhoto()}
                className="!w-20 bg-peach hover:bg-peach_hover"
              >
                {isDeleteLoading ? (
                  <Loader2 className="animate-spin ms:!w-6 ms:!h-6" />
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange("name")}
                className="w-full border-white/50"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={formData.email}
                onChange={handleInputChange("email")}
                className="w-full border-white/50"
                required
              />
              {errors.email && (
                <p className="text-xs text-peach mt-1">{errors.email}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password" className="text-right">
                Change Password
              </Label>
              <Input
                type="password"
                value={formData.password}
                onChange={handleInputChange("password")}
                className="w-full border-white/50"
                autoComplete="new-password"
              />
              {errors.password && (
                <p className="text-xs text-peach mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button
              className="w-1/4 bg-royal_blue hover:bg-royal_blue/75"
              type="submit"
              onClick={handleSaveChanges}
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sidebar;

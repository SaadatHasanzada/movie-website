import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  validateChangePassword,
  validateEmail,
  validateFileSize
} from "@/utils/validation";

import { Button } from "@/components/ui/button";
import CircleMarker from "@/components/ui/CircleMarker";
import { ERROR_MESSAGES } from "@/constants";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { FormErrors } from "@/features/auth/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { ProfileFormData } from "@/features/auth/types";
import { User } from "@supabase/supabase-js";
import UserAvatar from "@/components/UserAvatar";
import { toast } from "react-toastify";
import { useAsyncService } from "@/hooks/useAsyncService";
import { useAuth } from "@/features/auth/hooks/AuthContext";
import { userService } from "@/features/auth/services/supabase";

interface EditProfileProps {
  user: User | null | undefined;
  executeGetUser: (...args: any[]) => Promise<User | null | undefined>;
  isUserImgLoading: boolean;
  previewImage: string | null | undefined;
  setPreviewImage: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
  selectedFile: File | null | undefined;
  setSelectedFile: React.Dispatch<
    React.SetStateAction<File | null | undefined>
  >;
}

const EditProfile = ({
  user,
  executeGetUser,
  isUserImgLoading,
  previewImage,
  setPreviewImage,
  selectedFile,
  setSelectedFile
}: EditProfileProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [fileErrorMessage, setFileErrorMessage] = useState<string | null>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
    password: ""
  });
  const isEmailChanging = formData.email !== user?.email;
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
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
        email: user.email || user.user_metadata.email || "",
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

    if (user?.is_anonymous) {
      toast(ERROR_MESSAGES.ANONYMOUS_USER_ERROR, { type: "info" });
      return;
    }
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
      await userService.updateUser(updateData);
      // Clean up
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }

      // Reset states
      setPreviewImage(null);
      setSelectedFile(null);
      if (isEmailChanging) {
        toast.success(
          "Profile updated. Please check your email to confirm the new address.",
          { type: "success" }
        );
      } else {
        toast.success("Profile updated successfully", { type: "success" });
      }
      setErrors((prev) => ({
        ...prev,
        network: null
      }));
    } catch (error) {
      if (error instanceof Error) {
        setErrors((prev) => ({
          ...prev,
          network: error.message
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          network: ERROR_MESSAGES.NETWORK_ERROR
        }));
      }
      console.error("Profile update error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePhoto = () => {
    if (user?.is_anonymous) {
      toast(ERROR_MESSAGES.ANONYMOUS_USER_ERROR, { type: "info" });
      return;
    }
    if (!user) return;
    setPreviewImage(null);
    setSelectedFile(null);
    executeDeleteProfilePhoto(user);
  };

  return (
    <DialogContent className="ms:max-w-[600px] pt-5 px-4 ms:px-6 bg-dark_blue border-[0px] ms:border border-semi_dark_blue">
      <DialogHeader className="mb-4">
        <DialogTitle className="text-base ms:text-lg text-left">
          Hey{" "}
          <span className="underline decoration-wavy decoration-peach">
            {" "}
            {user?.user_metadata?.full_name || "Cinephile"}
          </span>
          , <CircleMarker text="update" /> your details{" "}
        </DialogTitle>
      </DialogHeader>
      <div className="flex items-center flex-col ms:flex-row gap-4 justify-between">
        <div className="flex gap-3 items-center">
          <UserAvatar
            imageUrl={previewImage || user?.user_metadata?.image}
            email={user?.email}
            isLoading={isUserImgLoading}
            className="h-16 w-16 ms:w-20 ms:h-20 text-2xl "
          />
          <div className="max-w-28 space-y-2">
            <p className="text-xs text-gray-500 italic ">
              Image should be less than 300KB
            </p>
            {fileErrorMessage && (
              <p className="text-xs text-red-500 italic">{fileErrorMessage}</p>
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
            <ErrorMessage error={errors.email} textClassName="text-xs" />
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password" className="text-right">
            Change Password
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange("password")}
              className="w-full border-white/50 pr-10"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {errors.password && (
            <ErrorMessage error={errors.password} textClassName="text-xs" />
          )}
        </div>
      </div>
      {errors.network && (
        <ErrorMessage error={errors.network} textClassName="text-sm" />
      )}
      <DialogFooter className="mt-4 flex-row justify-end">
        <Button
          className="w:1/3 ms:w-1/4 bg-royal_blue hover:bg-royal_blue/75 text-base"
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
  );
};

export default EditProfile;

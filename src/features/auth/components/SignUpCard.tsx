import * as motion from "motion/react-client";

import { FormData, FormErrors } from "../types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { FormEvent, useState } from "react";
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch
} from "@/utils/validation";

import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import { ERROR_MESSAGES } from "@/constants";
import { FormInput } from "./FormInput";
import { Loader2 } from "lucide-react";
import { authService } from "..//services/supabase";

// fix some error validation problems, there is so much repetition - no fix
//protected route - home page and inside pages public-landing,sign in,registration,error page
// research some auth methods like subscriptions
// test account
// structure some folders

const SignUpCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: location?.state?.email || "",
    password: "",
    passwordConfirm: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      if (field === "email") {
        const { errorMessage } = validateEmail(value);
        setErrors((prev) => ({ ...prev, email: errorMessage }));
      } else if (field === "password") {
        const { errorMessage } = validatePassword(value);
        setErrors((prev) => ({ ...prev, password: errorMessage }));
      } else if (field === "passwordConfirm") {
        const { errorMessage } = validatePasswordMatch(
          value,
          formData.password
        );
        setErrors((prev) => ({ ...prev, passwordConfirm: errorMessage }));
      }
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const passwordConfirmValidation = validatePasswordMatch(
      formData.passwordConfirm!,
      formData.password
    );

    if (
      emailValidation.isValid &&
      passwordValidation.isValid &&
      passwordConfirmValidation.isValid
    ) {
      setLoading(true);
      try {
        await authService.signUp({
          email,
          password
        });

        setFormData({ email: "", password: "", passwordConfirm: "" });
        setErrors({});
        navigate("/login");
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes("already registered")
        ) {
          setErrors((prev) => ({
            ...prev,
            email: ERROR_MESSAGES.USER_EXISTS
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            network: ERROR_MESSAGES.NETWORK_ERROR
          }));
          console.error("Submission error:", error);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        type: "tween",
        duration: 0.4
      }}
      className="shadow-xl	 p-6 pb-8  bg-[#161D2F] rounded-[20px] w-full sm:max-w-[400px] sm:p-8"
    >
      <h1 className="heading-large mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
        <FormInput
          name="email"
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleInputChange("email")}
          error={errors.email}
          autoComplete="email"
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange("password")}
          error={errors.password}
          autoComplete="new-password"
        />
        <FormInput
          name="passwordConfirm"
          type="password"
          placeholder="Repeat password"
          value={formData.passwordConfirm!}
          onChange={handleInputChange("passwordConfirm")}
          error={errors.passwordConfirm}
          autoComplete="new-password"
        />
        {errors.network && (
          <div className="text-peach text-xs sm:text-[15px] mt-1 flex items-center   gap-1">
            {" "}
            <CircleX className="text-peach w-4 h-4  " />
            <span className="flex-1"> {errors.network}</span>
          </div>
        )}
        <Button
          className="mt-4 min-h-12 bg-peach hover:bg-white hover:text-semi_dark_blue text-base"
          type="submit"
        >
          {loading ? (
            <Loader2 className="animate-spin ms:!w-6 ms:!h-6" />
          ) : (
            "Create an account"
          )}
        </Button>
      </form>
      <div className="mt-6 text-white body-medium text-center  ">
        Already have an account?{" "}
        <Link to="/login" className="text-peach cursor-pointer">
          {" "}
          Sign In
        </Link>
      </div>
    </motion.div>
  );
};

export default SignUpCard;

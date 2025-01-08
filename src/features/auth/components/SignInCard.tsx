import * as motion from "motion/react-client";

import { CircleX, Loader2 } from "lucide-react";
import { FormData, FormErrors } from "../types";
import { Link, useNavigate } from "react-router-dom";
import React, { FormEvent, useState } from "react";
import { validateEmail, validatePassword } from "@/utils/validation";

import { Button } from "@/components/ui/button";
import { ERROR_MESSAGES } from "@/constants";
import { FormInput } from "./FormInput";
import { authService } from "../services/supabase";

const SignInCard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      const validator = field === "email" ? validateEmail : validatePassword;
      const { errorMessage } = validator(value);
      setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    if (emailValidation.isValid && passwordValidation.isValid) {
      setLoading(true);

      try {
        const data = await authService.signIn({
          email,
          password
        });
        if (data) {
          // setIsAuthenticated(true);
          setFormData({ email: "", password: "" });
          setErrors({});
          navigate("/home");
        }
      } catch (error) {
        if (error instanceof Error) {
          setErrors((prev) => ({
            ...prev,
            network: ERROR_MESSAGES.LOGIN_FAILURE
          }));
        } else {
          console.error(error);
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
      className="shadow-xl p-6 pb-8  bg-[#161D2F] rounded-[20px] w-full sm:max-w-[400px] sm:p-8"
    >
      <h1 className="heading-large mb-6">Sign In</h1>
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
          autoComplete="current-password"
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
            "Sign In"
          )}
        </Button>
      </form>
      <div className="mt-6 text-white body-medium text-center  ">
        Don’t have an account?{" "}
        <Link to="/registration" className="text-peach cursor-pointer">
          {" "}
          Sign Up
        </Link>
      </div>
    </motion.div>
  );
};

export default SignInCard;

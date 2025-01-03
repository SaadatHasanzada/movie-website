import React, { FormEvent, useState } from "react";
import { validateEmail, validatePassword } from "@/utils/validation";

import { Button } from "@/components/ui/button";
import { FormInput } from "./FormInput";
import { Link } from "react-router-dom";

interface FormErrors {
  email?: string | null;
  password?: string | null;
}

const SignInCard = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      const validator = field === "email" ? validateEmail : validatePassword;
      const { errorMessage } = validator(value);
      setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    if (emailValidation.isValid && passwordValidation.isValid) {
      try {
        // Add your API call here
        console.log("Successfully submitted");
        setFormData({ email: "", password: "" });
        setErrors({});
      } catch (error) {
        console.error("Submission error:", error);
        // Handle error appropriately
      }
    }
  };

  return (
    <div className="p-6 pb-8 bg-[#161D2F] rounded-[20px] w-full">
      <h1 className="heading-large mb-6">Sign in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
        <FormInput
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleInputChange("email")}
          error={errors.email}
          autoComplete="email"
        />
        <FormInput
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange("password")}
          error={errors.password}
          autoComplete="current-password"
        />

        <Button
          className="mt-4 min-h-12 bg-red-700 hover:bg-white hover:text-semi_dark_blue text-base"
          type="submit"
        >
          Sign In
        </Button>
      </form>
      <div className="mt-6 text-white body-medium text-center  ">
        Don’t have an account?{" "}
        <Link className="text-red-700" to="/">
          {" "}
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignInCard;

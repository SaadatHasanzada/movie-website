import { ArrowRight, CircleX } from "lucide-react";
import { FormEvent, useState } from "react";

import { Button } from "../ui/button";
import HeroImg from "@/assets/netflix-bg.jpg";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo.svg";
import { validateEmail } from "@/utils/validation";

const Hero = () => {
  //breakpoints
  // min-width:1280px -128px
  //min-width: 960px -64px
  // min-width:600 - 32px
  // 24px

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const { isValid, errorMessage } = validateEmail(newEmail);
    setErrorMessage(errorMessage);
    setIsSuccess(isValid);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isValid } = validateEmail(email);
    if (isValid) {
      // Handle successful submission
      setIsSuccess(false);
      setEmail("");
      // Add your API call or further processing here
    }
  };

  return (
    <div
      className="w-full max-w-[110rem] bg-cover bg-center h-screen relative "
      style={{ backgroundImage: `url(${HeroImg})` }}
    >
      <header
        className="flex items-center justify-between px-6 sm:px-8 md:px-16 xl:px-32 h-20 relative z-[3]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.8000) 0.000%, rgba(0, 0, 0, 0.7889) 8.333%, rgba(0, 0, 0, 0.7556) 16.67%, rgba(0, 0, 0, 0.7000) 25.00%, rgba(0, 0, 0, 0.6222) 33.33%, rgba(0, 0, 0, 0.5222) 41.67%, rgba(0, 0, 0, 0.4000) 50.00%, rgba(0, 0, 0, 0.2778) 58.33%, rgba(0, 0, 0, 0.1778) 66.67%, rgba(0, 0, 0, 0.1000) 75.00%, rgba(0, 0, 0, 0.04444) 83.33%, rgba(0, 0, 0, 0.01111) 91.67%, rgba(0, 0, 0, 0.000) 100.0%)"
        }}
      >
        <Link to="/">
          <img
            src={Logo}
            alt="Movie Logo"
            className="w-10 h-8 ms:w-12 ms:h-10"
          />
        </Link>
        <Button size="lg" className="bg-red-700 hover:bg-red-800 text-lg">
          Sign in
        </Button>
      </header>
      <div className="px-8 flex flex-col items-center justify-center h-[calc(100%-80px)] relative z-[3] sm:max-w-[33rem]  md:max-w-[35.75rem] xl:max-w-[40.75rem] mx-auto pb-24 lg:pb-5">
        <h1 className="text-[32px]  ms:text-[46px] xl:text-[56px] leading-tight	font-bold text-white text-center mb-10">
          Unlimited movies, TV shows, and more
        </h1>
        <form className=" w-full" onSubmit={handleSubmit}>
          <h3 className="mb-4 text-lg text-center">
            Ready to explore? Enter your email to create your account.
          </h3>
          <div className="relative flex flex-col  sm:flex-row sm:gap-2  justify-center  w-full ">
            <div
              className={`w-full flex-[2] relative flex items-end min-h-12  sm:min-h-14  rounded-md border border-[#808080b3] bg-[#161616]/70 ${
                errorMessage
                  ? "border-error"
                  : isSuccess
                  ? "border-success"
                  : ""
              }`}
            >
              <Input
                className=" w-full peer border-none focus-visible:ring-0 shadow-none pl-4 text-base ms:!text-lg  "
                type="email"
                id="email"
                placeholder=" "
                value={email}
                minLength={5}
                maxLength={50}
                onChange={handleEmailChange}
                required
              />

              <Label
                htmlFor="email"
                className="absolute opacity-70 transition-all cursor-text left-4 top-1/2
                  peer-placeholder-shown:text-base peer-placeholder-shown:-translate-y-1/2
                  peer-[:not(:placeholder-shown)]:text-xs   peer-[:not(:placeholder-shown)]:-translate-y-5
                  peer-focus:-translate-y-5  peer-focus:text-xs "
              >
                Email address
              </Label>
              <span></span>
            </div>

            {errorMessage && (
              <div className="flex items-center  gap-1 mt-[4px]  sm:absolute -bottom-8 left-0">
                <CircleX className="text-red-700 w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-red-700 text-xs ms:text-sm">
                  {errorMessage}
                </span>
              </div>
            )}

            <Button className="w-full mt-4 sm:mt-0 min-h-12  sm:min-h-14 flex-1 text-[18px] ms:text-[22px] bg-red-700 hover:bg-red-800">
              Get Started
              <ArrowRight
                size={24}
                className="ml-1 !w-5 !h-5 ms:!w-[24px] ms:!h-[24px]"
              />
            </Button>
          </div>
        </form>
      </div>
      <div
        className="h-full w-full absolute top-0 left-0 z-[2]"
        style={{
          backgroundImage:
            "linear-gradient(7deg, rgba(0, 0, 0, 0.8500) 10.00%, rgba(0, 0, 0, 0.8465) 17.25%, rgba(0, 0, 0, 0.8361) 24.50%, rgba(0, 0, 0, 0.8187) 31.75%, rgba(0, 0, 0, 0.7944) 39.00%, rgba(0, 0, 0, 0.7632) 46.25%, rgba(0, 0, 0, 0.7250) 53.50%, rgba(0, 0, 0, 0.6868) 60.75%, rgba(0, 0, 0, 0.6556) 68.00%, rgba(0, 0, 0, 0.6312) 75.25%, rgba(0, 0, 0, 0.6139) 82.50%, rgba(0, 0, 0, 0.6035) 89.75%, rgba(0, 0, 0, 0.6000) 97.00%)"
        }}
      />
    </div>
  );
};

export default Hero;

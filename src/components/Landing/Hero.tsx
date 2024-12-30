import { ArrowRight, CircleX } from "lucide-react";
import { FormEvent, useState } from "react";

import { Button } from "../ui/button";
import HeroImg from "@/assets/netflix-bg.jpg";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo.svg";

const Hero = () => {
  const [email, setEmail] = useState("");
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  //improve code quality and performance
  // create seperate components if it is needed
  // create additional overlay for the top of header
  // make this part responsive

  //Add to github at the end of the day !important

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateEmail();
    if (validateEmail()) {
      setErrorMessage(null);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateEmail()) {
      console.log("Form submitted successfully!");
    }
  };

  const validateEmail = () => {
    if (email.length === 0) {
      setErrorMessage("Email is required.");
      return false;
    }
    if (!emailPattern.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    console.log(errorMessage);
    return true;
  };
  return (
    <div
      className="w-full max-w-[110rem] bg-cover bg-center h-screen relative "
      style={{ backgroundImage: `url(${HeroImg})` }}
    >
      <header className="flex items-center justify-between px-32 h-20 relative z-[3]">
        <Link to="/">
          <img src={Logo} alt="Movie Logo" width="50px" height="50px" />
        </Link>
        <Button size="lg" className="bg-red-700 hover:bg-red-800 text-lg">
          Sign in
        </Button>
      </header>
      <div className="flex flex-col items-center justify-center h-[calc(100%-80px)] relative z-[3] max-w-[36.875rem] mx-auto pb-5">
        <h1 className="text-6xl font-bold text-white text-center mb-10">
          Unlimited movies, TV shows, and more
        </h1>
        <form className=" w-full" onSubmit={(e) => handleSubmit(e)}>
          <h3 className="mb-4 text-lg text-center">
            Ready to explore? Enter your email to create your account.
          </h3>
          <div className="flex items-center justify-center gap-2 w-full ">
            <div className="relative flex items-end flex-[2] min-h-14 border-[#808080b3] rounded-md border  bg-[#161616]/70">
              <Input
                className=" w-full peer border-none focus-visible:ring-0 shadow-none pl-4 !text-lg  "
                type="email"
                id="email"
                placeholder=" "
                value={email}
                minLength={5}
                maxLength={50}
                onChange={(e) => handleChange(e)}
                required
              />
              {errorMessage && (
                <div className="flex items-center gap-1  absolute -bottom-8 left-0">
                  <CircleX size={20} className="text-red-700" />
                  <span className="text-red-700 text-s">{errorMessage}</span>
                </div>
              )}

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

            <Button className="min-h-14 flex-1 text-[22px] bg-red-700 hover:bg-red-800">
              Get Started
              <ArrowRight size={24} className="ml-1 !w-[24px] !h-[24px]" />
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

import BgImg from "@/assets/netflix-bg.jpg";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo.svg";
import React from "react";
import SignInCard from "@/features/auth/components/SignInCard";
import SignUpCard from "@/features/auth/components/SignUpCard";

const AuthScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center overflow-x-hidden">
      <div
        className="w-full max-w-[110rem] bg-cover bg-center h-screen relative "
        style={{ backgroundImage: `url(${BgImg})` }}
      >
        <div className="relative z-[3] px-6 py-12 mx-auto w-full flex items-center flex-col gap-[58px]">
          <div className="flex items-center">
            <Link to="/">
              <img
                src={Logo}
                alt="Movie Logo"
                className="w-10 h-8 ms:w-12 ms:h-10"
              />
            </Link>
          </div>
          <SignInCard />
        </div>

        <div
          className="h-full w-full absolute top-0 left-0 z-[2]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(22,29,47,0.7231267507002801) 97%, rgba(22,29,47,0.9023984593837535) 100%, rgba(16,20,30,0.6811099439775911) 100%)"
          }}
        />
      </div>
    </div>
  );
};

export default AuthScreen;

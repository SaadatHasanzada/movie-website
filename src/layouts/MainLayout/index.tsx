import React from "react";
import { SEARCH_PLACEHOLDERS } from "@/constants";
import SearchBar from "../../components/Search";
import Sidebar from "../../components/Sidebar";
import style from "./style.module.scss";
import { useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  const getPlaceholder = () => {
    const path = pathname.slice(1);
    return SEARCH_PLACEHOLDERS[path] || SEARCH_PLACEHOLDERS.default;
  };

  return (
    <div className={style.mainLayout}>
      <Sidebar />
      <div className={style.mainContent}>
        <SearchBar placeholder={getPlaceholder()} />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;

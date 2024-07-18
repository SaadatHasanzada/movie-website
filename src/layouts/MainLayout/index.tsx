import React from "react";
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/Search";
import style from './style.module.scss';
import { useLocation } from "react-router-dom";

interface MainLayoutProps{
  children: React.ReactNode;  // This prop accepts any child component
}

const MainLayout:React.FC<MainLayoutProps> = ({children}) => {
const location=useLocation();

const getPlaceholder=()=>{
  switch(location.pathname){
    
    case '/movies':
      return 'Search for movies';
    case '/series':
      return 'Search for TV series';
    case '/bookmarks':
      return 'Search for bookmarked shows';
    default:
      return 'Search for movies or TV series';
  }

}

const placeholder=getPlaceholder();
  return (
    <div className={style.mainLayout}>
        <Sidebar />    
      <div className={style.mainContent}>
      <SearchBar placeholder={placeholder} />
     {children}
          </div>
    </div>
  )
}

export default MainLayout
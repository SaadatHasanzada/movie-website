import React, { createContext, useContext, useState,ReactNode} from 'react';
import {Movie} from '../interfaces/Movie';
import data from '../data/data.json';

interface BookmarkContextType {
    movies: Movie[];
    toggleBookmark: (title: string) => void;
  }
interface BookmarkProviderProps {
    children: ReactNode;
  }
  const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);
  export const useBookmarkContext = () => {
    const context = useContext(BookmarkContext);
    if (!context) {
      throw new Error('useBookmarkContext must be used within a BookmarkProvider');
    }
    return context;
  };
  
 
  
  export const  BookmarkProvider:React.FC<BookmarkProviderProps> = ({children }) => {
    const [movies,setMovies]=useState<Movie[]>(data as Movie[]);
    const toggleBookmark = (title: string) => {
        const updatedMovies = movies.map((movie) =>
          movie.title === title ? { ...movie, isBookmarked: !movie.isBookmarked } : movie
        );
        setMovies(updatedMovies);
      };
    return (
        <BookmarkContext.Provider value={{ movies, toggleBookmark }}>
        {children}
      </BookmarkContext.Provider>    )
  }
  
  export default BookmarkContext

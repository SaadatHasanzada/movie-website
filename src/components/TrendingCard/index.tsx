import React from 'react'
import style from './style.module.scss';
import MovieInfo from '../MovieInfo';
import Bookmark from '../Bookmark';
import {Movie} from '../../interfaces/Movie';
import { useMediaQuery } from 'react-responsive';
import PlayButton from '../PlayButton';
import { useState } from 'react';

interface TrendingCardProps {
  TrendingMovie: Movie;
}
const TrendingCard:React.FC<TrendingCardProps> = ({TrendingMovie}) => {

  const [isHovered, setIsHovered] = useState(false);

const isMobile = useMediaQuery({ query: '(max-width: 767.98px)' })
const bgImage=isMobile ? TrendingMovie.thumbnail.trending!.small : TrendingMovie.thumbnail.trending!.large;
const backgroundImageStyle = {
  backgroundImage:`url(/src${bgImage})`

};

  return (
    <div className={style.movieCard} style={backgroundImageStyle} onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
    <Bookmark className title={TrendingMovie.title} isBookmarked={TrendingMovie.isBookmarked}/>
    <MovieInfo customStyle {...TrendingMovie}/>
   <PlayButton isHovered={isHovered}/>
  </div>  )
}

export default TrendingCard
import React from 'react'
import style from './style.module.scss';
import TrendingCard from '../TrendingCard';
import {Movie} from '../../interfaces/Movie';
import { filterTrending } from '../../utils/dataFilters';
import { useBookmarkContext } from '../../contexts/BookmarkContext';

const Trending:React.FC = () => {
  const { movies} = useBookmarkContext();
  const trendingData: Movie[] = filterTrending(movies);

  return (
    <section id={style.trending}>
        <h2 className={style.title}>Trending</h2>
        <div className={style.movieList}>
          {trendingData.map((data)=>{
            return <TrendingCard key={data.title} TrendingMovie={data}/>
          })}
           
      
        </div>

    </section>
  )
}

export default Trending;
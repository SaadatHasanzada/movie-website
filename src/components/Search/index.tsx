import React from 'react'
import style from './style.module.scss';
import { useSearchContext } from '../../contexts/SearchContext';
interface SearchBarProps{
  placeholder:string;
    }
const SearchBar:React.FC<SearchBarProps>= ({placeholder}) => {

  const {setSearchQuery,searchQuery} =useSearchContext();
function handleChange(e:React.ChangeEvent<HTMLInputElement>){
setSearchQuery(e.target.value)
}


  return (
    <div className={style.searchBar}>
        <div className={style.searchIcon}>
        </div>
        <input id='searchMovie' type="text" placeholder={placeholder} value={searchQuery} onChange={handleChange}/>

    </div>
  )
}

export default SearchBar
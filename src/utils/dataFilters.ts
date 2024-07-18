import {Movie} from '../interfaces/Movie';
// import data from '../data/data.json';

// const mediaData: movie[] = data as movie[];

export const filterTrending=(mediaData:Movie[])=>{
    return mediaData.filter((item: Movie) => item.thumbnail.trending)
}
export const filterRecommended=(mediaData:Movie[])=>{
    return mediaData.filter((item: Movie) => !item.thumbnail.trending)
}
export const filterMovies=(mediaData:Movie[])=>{
    return mediaData.filter((item: Movie) => item.category==='Movie')
}
export const filterSeries=(mediaData:Movie[])=>{
    return mediaData.filter((item: Movie) => item.category==='TV Series')
}
export const filterBookmarkedMovies=(mediaData:Movie[])=>{
    return mediaData.filter((item: Movie) => item.category==='Movie' && item.isBookmarked )
}
export const filterBookmarkedSeries=(mediaData:Movie[])=>{
    return mediaData.filter((item: Movie) => item.category==='TV Series' && item.isBookmarked)
}
export const filterBookmarkedMedia=(mediaData:Movie[])=>{
    return mediaData.filter((item: Movie) => item.isBookmarked)
}

export const filterSearchResults = (movies: Movie[], query: string): Movie[] => {
    return movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
  };
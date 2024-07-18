import {category} from '../types/category';

interface Thumbnail{
    regular: {
        small: string;
        medium: string;
        large: string;
    };
    trending?: {
        small: string,
        large: string
      }
}

export interface Movie{
    title:string,
    thumbnail:Thumbnail,   
    year:number,
    category:category,
    rating:string,
    isBookmarked:boolean,
    isTrending:boolean
}
import { createContext,useContext,useState,ReactNode } from 'react';

interface SearchContext{
    searchQuery:string;
    setSearchQuery:(query:string) => void;
    resetSearch:() => void;  // Reset the search query to an empty string
}
interface SearchProviderProps {
    children: ReactNode;
  }
const SearchContext = createContext<SearchContext | undefined>(undefined);

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (!context) {
      throw new Error('useSearchContext must be used within a SearchProvider');
    }
    return context;
  };



  export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const resetSearch=()=>{
      setSearchQuery('');
    }
  
    return (
      <SearchContext.Provider value={{ searchQuery, setSearchQuery,resetSearch }}>
        {children}
      </SearchContext.Provider>
    );
  };

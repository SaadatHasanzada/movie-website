import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BookmarkProvider } from './contexts/BookmarkContext';
import { SearchProvider } from './contexts/SearchContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SearchProvider>
    <BookmarkProvider>
    <App />
    </BookmarkProvider>
</SearchProvider>
  </React.StrictMode>,
)

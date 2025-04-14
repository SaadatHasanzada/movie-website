import App from "./App.tsx";
import { BookmarkProvider } from "./features/bookmark/hooks/BookmarkContext.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { SearchProvider } from "./contexts/SearchContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SearchProvider>
      <BookmarkProvider>
        <App />
      </BookmarkProvider>
    </SearchProvider>
  </React.StrictMode>
);

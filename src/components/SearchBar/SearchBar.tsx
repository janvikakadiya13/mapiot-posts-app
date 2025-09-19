// src/components/SearchBar/SearchBar.tsx
import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

/**
 * A search bar component to filter posts by title.
 * @param {string} searchTerm - The current search term.
 * @param {(term: string) => void} setSearchTerm - Callback to update the search term.
 */
interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search posts by title..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: 4 } }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "text.secondary" }} />
          </InputAdornment>
        ),
      }}
      aria-label="Search posts by title"
    />
  );
};

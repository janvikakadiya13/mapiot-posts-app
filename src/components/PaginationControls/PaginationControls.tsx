// src/components/PaginationControls/PaginationControls.tsx
import React from "react";
import { Pagination, Box } from "@mui/material";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * A component to handle pagination controls for the post list.
 * @param {number} currentPage - The current page number.
 * @param {number} totalPages - The total number of pages.
 * @param {(page: number) => void} onPageChange - Callback to change the page.
 */
export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(e, page) => onPageChange(page)}
        color="primary"
        size="large"
        aria-label="Pagination controls"
      />
    </Box>
  );
};

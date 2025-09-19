// src/containers/PostContainer/PostContainer.tsx
import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Alert,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { ViewList, ViewModule } from "@mui/icons-material";
import SearchBar from "../../components/SearchBar";
import PostList from "../../components/PostList";
import PaginationControls from "../../components/PaginationControls";
import { apiService } from "../../api/apiService";
import { usePostPagination } from "../../hooks/usePostPagination";
import { constants } from "../../constants/constant";

// Define Post interface
interface Post {
  id: number;
  title: string;
  body: string;
}

/**
 * The main container component for displaying MapIot.ai posts.
 * Manages state, API calls, and renders the post list with search and pagination.
 */
export const PostContainer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list"); // Default to list

  // Fetch posts from API on component mount
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.fetchPosts();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const { currentPage, setCurrentPage, currentPosts, totalPages } =
    usePostPagination(posts, searchTerm);

  const handleRetry = () => {
    fetchPosts();
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          flexDirection: "column",
        }}
      >
        <CircularProgress color="primary" />
        <Typography variant="h6" sx={{ mt: 2, color: "text.secondary" }}>
          Loading posts
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{ color: "text.primary", mb: 3 }}
      >
        MapIot.ai Posts
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3, alignItems: "center" }}>
          {error}
          <Button
            color="inherit"
            size="small"
            onClick={handleRetry}
            sx={{ ml: 1 }}
            aria-label="Retry fetching posts"
          >
            Retry
          </Button>
        </Alert>
      )}

      {!error && (
        <>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {/*  In mobile view (xs), don't display the grid/list view buttons, as both xs and sm will have the same design for these views   */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              justifyContent: "flex-end",
              mb: 2,
              gap: 1,
            }}
          >
            <Button
              variant={viewMode === "list" ? "contained" : "outlined"}
              onClick={() => setViewMode("list")}
              aria-label="Switch to list view"
            >
              <ViewList />
            </Button>
            <Button
              variant={viewMode === "grid" ? "contained" : "outlined"}
              onClick={() => setViewMode("grid")}
              aria-label="Switch to grid view"
            >
              <ViewModule />
            </Button>
          </Box>
          <Box
            sx={{ maxHeight: constants.LISTING_MAX_HEIGHT, overflowY: "auto" }}
          >
            <PostList posts={currentPosts} viewMode={viewMode} />
          </Box>
          {totalPages > 0 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
          {currentPosts.length === 0 && !loading && (
            <Typography
              variant="h6"
              align="center"
              sx={{ mt: 4, color: "text.secondary" }}
            >
              No posts found matching <b>"{searchTerm}".</b>
            </Typography>
          )}
        </>
      )}
    </Container>
  );
};

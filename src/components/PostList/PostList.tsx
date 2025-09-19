// src/components/PostList/PostList.tsx
import React, { useState } from "react";
import { Grid, Stack } from "@mui/material";
import PostCard from "../PostCard";
import DetailDialog from "../DetailDialog";
import { Post } from "../PostCard/PostCard";

/**
 * A component to display a list of posts in list or grid view.
 * @param {Post[]} posts - The array of posts to display.
 * @param {'list' | 'grid'} viewMode - The display mode (list or grid).
 */
interface PostListProps {
  posts: Post[];
  viewMode: "list" | "grid";
}

export const PostList: React.FC<PostListProps> = ({ posts, viewMode }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleViewDetail = (post: Post) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPost(null);
  };

  if (posts.length === 0) return null;

  return (
    <>
      {viewMode === "grid" ? (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <PostCard
                post={post}
                viewMode="grid"
                onViewDetail={handleViewDetail}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Stack spacing={3}>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              viewMode="list"
              onViewDetail={handleViewDetail}
            />
          ))}
        </Stack>
      )}
      <DetailDialog
        open={openDialog}
        title={selectedPost?.title || "Post Details"}
        content={selectedPost?.body || ""}
        onClose={handleCloseDialog}
      />
    </>
  );
};

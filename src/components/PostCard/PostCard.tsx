// src/components/PostCard/PostCard.tsx
import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

// Define Post interface
export interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostCardProps {
  post: Post;
  viewMode: "list" | "grid";
  onViewDetail: (post: Post) => void; // Callback for dialog
}

/**
 * A card component to display a single post with a view detail button.
 * @param {Post} post - The post data to display.
 * @param {'list' | 'grid'} viewMode - The display mode (list or grid).
 * @param {(post: Post) => void} onViewDetail - Callback to open the detail dialog.
 */
export const PostCard: React.FC<PostCardProps> = ({
  post,
  viewMode,
  onViewDetail,
}) => {
  const shortenedBody =
    post.body.length > 100 ? `${post.body.slice(0, 100)}...` : post.body;

  const cardSx = {
    maxWidth: "100%",
    mb: 2,
    height: viewMode === "grid" ? { xs: "auto", sm: "250px" } : "auto", // Uniform height
    display: "flex",
    flexDirection: { sm: viewMode === "grid" ? "column" : "row", xs: "column" },
    justifyContent: "space-between",
    overflow: "hidden",
    m: 0,
  };

  return (
    <Card sx={cardSx}>
      <CardContent sx={{ p: 2, flexGrow: 1 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "text.primary", fontWeight: 500 }}
        >
          {post.title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {shortenedBody}
        </Typography>
      </CardContent>
      <Box sx={{ p: 1, textAlign: "right", alignSelf: "center" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onViewDetail(post)}
          sx={{ mb: 1, minWidth: "90px", p: 1, alignSelf: "center" }}
          aria-label={`View details for post ${post.title}`}
        >
          View Detail
        </Button>
      </Box>
    </Card>
  );
};

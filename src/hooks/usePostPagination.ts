// src/hooks/usePostPagination.ts
import { useState, useEffect } from 'react';
import { Post } from '../components/PostCard/PostCard';
import { constants } from '../constants/constant';

export const usePostPagination = (initialPosts: Post[], searchTerm: string) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);

  useEffect(() => {
    // Filter posts based on search term
    const filtered = initialPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to first page on new search
  }, [initialPosts, searchTerm]);

  const indexOfLastPost = currentPage * constants.POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - constants.POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / constants.POSTS_PER_PAGE);

  return {
    currentPage,
    setCurrentPage,
    currentPosts,
    totalPages,
    filteredPosts,
  };
};
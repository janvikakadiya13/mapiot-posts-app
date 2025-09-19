import { Post } from "../components/PostCard/PostCard";

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const apiService = {
  fetchPosts: async (): Promise<Post[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      return data as Post[];
    } catch (err) {
      throw err instanceof Error ? err : new Error('Unknown error');
    }
  },
};
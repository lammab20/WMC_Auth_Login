import React, { useState, useEffect } from 'react';
import { getPosts } from '../api/api';

interface Post {
  username: string;
  title: string;
}

interface ShowPostsProps {
  accessToken: string;
}

const ShowPosts: React.FC<ShowPostsProps> = ({ accessToken }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(accessToken);
        setPosts(data);
      } catch (err) {
        setError('Fehler beim Abrufen der Posts');
        console.error(err);
      }
    };

    if (accessToken) {
      fetchPosts();
    }
  }, [accessToken]);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Posts</h2>
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div key={index} className="bg-white shadow rounded p-4">
            <h5 className="text-xl font-semibold mb-2">{post.title}</h5>
            <h6 className="text-gray-600">Von {post.username}</h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowPosts;

import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries.js';
import PostList from '../components/PostList'


const Home = () => {
  // use useQuery hook to make query request
  const { data, loading } = useQuery(QUERY_POSTS);

  const post = data?.posts || [];
  console.log(post);

  return (
    <main>
 
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {loading ? (
            <div>Loading...</div>
            ) : (
              < PostList posts={post} />
              )}
        </div>
      </div>
      
    </main>
  );
};

export default Home;

import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries.js';
import PostList from '../components/PostList'
import Header from '../components/Header'

const Home = () => {
  // use useQuery hook to make query request
  const { data, loading } = useQuery(QUERY_POSTS);

  const post = data?.posts || [];
  console.log(post);

  return (
    <main className="flex-row  mb-4">
      <Header />
      <div className="postContainer">
       
          {loading ? (
            <div>Loading...</div>
            ) : (
              < PostList posts={post} />
              )}
     
      </div>
      
    </main>
  );
};

export default Home;

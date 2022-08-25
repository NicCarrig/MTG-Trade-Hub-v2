import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS, QUERY_ME } from '../utils/queries.js';
import PostList from '../components/PostList';
import Header from '../components/Header';
import Auth from '../utils/auth';
import PostForm from '../components/PostForm/index.js';

const Home = () => {
  // use useQuery hook to make query request
  const { data, loading } = useQuery(QUERY_POSTS);
  const { data: userData } = useQuery(QUERY_ME);

  const post = data?.posts || [];
  // console.log(post);
  console.log(userData);

  const loggedIn = Auth.loggedIn();

  return (
    <main className="flex-row  mb-4">
      <Header />
      <div className='d-flex flex-column justify-content-center'>
       
        <div className="postContainer">
          {loggedIn && ( 
          <div>
            <PostForm />
          </div>)}
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

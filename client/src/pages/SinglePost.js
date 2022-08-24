import React from 'react';
import { useParams } from 'react-router-dom';

import Header from '../components/Header'

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_POST } from '../utils/queries';


const SinglePost = (props) => {
  const { id: postId } = useParams();
console.log(postId)

  const { loading, data } = useQuery(QUERY_POST, {
    variables: { id: postId },
  });


  const post = data?.post || {};


  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <main className="flex-row justify-center mb-4">
      <Header />
    <div className='postContainer'>
      <div className="postCard card mb-3">
        <p className="postCardHeader card-header">
          
            {post.username}
         {' '}
           {post.createdAt}
        </p>
        <div className="card-body">
          <p>{post.postBody}</p>
        </div>
      </div>
        {post.comments.length > 0 && (
          <CommentList comments={post.comments} />
        )}

        {/* {Auth.loggedIn() && <CommentForm postId={post._id} />} */}

     </div>
    </main>

  );
};

export default SinglePost;

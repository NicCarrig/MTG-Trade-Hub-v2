import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({posts}) => {
  if (!posts.length) {
    return <h3>No posts yet...</h3>;
  }

  return (
    <div className='postContainer'>
      
      {posts &&
        posts.slice(0,10).map(post => (
          <div key={post._id} className="card postCard mb-3">
            <p className="card-header postCardHeader">
              <b>{post.title}</b>{' by '}  
              <Link to={`/profile/${post.username}`} style={{ fontWeight: 700 }}>
                {post.username}
              </Link>{' '}
               on {post.createdAt}
            </p>
            <div className="card-body">
            <Link to={`/post/${post._id}`}>
              <p>{post.postBody}</p>
              <button className="btn btn-sm">
                Go to post
              </button>
            </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;
import React from 'react';

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
             <b>{post.title}</b> By {post.username} at {post.createdAt}
            </p>
            <div className="card-body">
              <p>{post.postBody}</p>
              <button className="btn btn-sm">
                Go to post
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;
import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';

const PostForm = () => {
  const [postBody, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {

      // could potentially not exist yet, so wrap in a try/catch
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, posts: [...me.posts, addPost] } },
        });
      } catch (e) {
        console.warn("First Post insertion by user!")
      }

      // update post array's cache
      const { posts } = cache.readQuery({ query: QUERY_POSTS });
      cache.writeQuery({
        query: QUERY_POSTS,
        data: { posts: [addPost, ...posts] },
      });
    }
  });

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addPost({
        variables: { title, postBody },
      });

      // clear form value
      setBody('');
      setTitle('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      
      <form
        className="mb-3 postForm flex-row justify-center align-stretch"
        onSubmit={handleFormSubmit}
      ><div className='light-font'>Add a post</div>
        <input className="postForm-textarea col-12" type="text" value={title}  placeholder='Title' onChange={handleTitleChange}></input>
        <textarea
          placeholder="New Post..."
          value={postBody}
          className="postForm-textarea col-12 "
          onChange={handleChange}
        ></textarea>
        <button className="postSubmitbtn btn col-12" type="submit">
          Submit
        </button>
        <div className='light-font'>
        <p 
          className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
        >
          Character Count: {characterCount}/280
          {error && <span className="ml-2">Something went wrong...</span>}
        </p>
        </div>
      </form>
    </div>
  );
};

export default PostForm;

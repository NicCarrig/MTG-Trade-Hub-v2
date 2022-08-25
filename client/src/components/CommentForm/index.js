import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

const CommentForm = ({ postId }) => {
  const [commentBody, setBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

 // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log(postId);
    console.log(commentBody);
    try {
      await addComment({
        variables: { commentBody, postId },
      });

      // clear form value
      setBody('');
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
      >
        <textarea
          placeholder="Leave a comment..."
          value={commentBody}
          className="postForm-textarea col-12"
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

      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default CommentForm;

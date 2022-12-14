import { gql } from '@apollo/client';


export const QUERY_POSTS = gql`
  query posts($username: String) {
    posts(username: $username) {
      _id
      title
      username
      postBody
      createdAt
      commentCount
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;

export const QUERY_POST = gql`
  query post($id: ID!) {
    post(_id: $id) {
      _id
     title
      username
      postBody
      createdAt
      commentCount
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      posts {
        _id
        postBody
        createdAt
        commentCount
      }
      inventory {
        _id
        username
        card_name
        scryfall_id
        img_uri
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      posts {
        _id
        postBody
        createdAt
      }
      inventory {
        card_name
        scryfall_id
        img_uri
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

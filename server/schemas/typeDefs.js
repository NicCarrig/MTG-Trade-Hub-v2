// TypeDef: literally defining every piece of data that the client can expect to work with through a query or mutation.


// Import gql tagged template function
const { gql } = require('apollo-server-express');


// create typeDefs
const typeDefs = gql`

  type Comment {
    _id: ID
    writtenBy: String
    commentBody: String
    username: String
    createdAt: String
    replyCount: Int
    replies: [Reply]
  }
  type Reply {
    _id: ID
    replyBody: String
    createdAt: String
    username: String
  }
  type Post {
    _id: ID
    title: String
    username: String
    postBody: String
    createdAt: String
    comments: [Comment]

  }
  type User {
  _id: ID
  username: String
  email: String
  friendCount: Int
  posts: [Post]
  comments: [Comment]
  friends: [User]
}
  type Query {
    users: [User]
    user(username: String!): User 
    comments(username: String): [Comment]
    comment(_id: ID!): Comment
    posts(username: String): [Post]
    post(_id: ID!): Post
  }
  `
  // inventory type
  // comment type 
  // Post type
  // Query type
  // mutation type
  
  ;


  // export them
module.exports = typeDefs;
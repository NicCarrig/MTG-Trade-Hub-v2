const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }
  type Auth {
    token: ID!
    user: User
  } `
  // inventory type
  // comment type 
  // Post type
  // Query type
  // mutation type
  
  ;

module.exports = typeDefs;
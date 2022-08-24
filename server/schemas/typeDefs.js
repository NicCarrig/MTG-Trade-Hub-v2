// TypeDef: literally defining every piece of data that the client can expect to work with through a query or mutation.


// Import gql tagged template function
const { gql } = require('apollo-server-express');


// create typeDefs
const typeDefs = gql`


  type Post {
    _id: ID
    title: String
    username: String
    postBody: String
    createdAt: String
    comments: [Comment]
  }
  type Comment {
    _id: ID
    commentBody: String
    createdAt: String
    username: String
  }
  
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    posts: [Post]
    inventory: [Inventory]
    friends: [User]
  }

  type Inventory {
    _id: ID 
    username: String
    card_name: String
    scryfall_id: String
    img_uri: String
    addedAt: String

  }
  
  type Auth {
    token: ID!
    user: User
  }
  
  type Query {
    me: User
    users: [User]
    user(username: String!): User 
    posts(username: String): [Post]
    post(_id: ID!): Post
    inventory: [Inventory]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPost(title: String!, postBody: String!): Post
    addComment(postId: ID! commentBody: String!): Post
    addInventory(card_name: String!, scryfall_id: String!, img_uri: String! ): Inventory
    addFriend(friendId: ID!): User
    deletePost(_id: ID!): User

  }


  `
  ;


  // export them
module.exports = typeDefs;
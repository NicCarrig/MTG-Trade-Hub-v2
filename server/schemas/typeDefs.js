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
    comments(username: String): [Comment]
    comment(_id: ID!): Comment
    posts(username: String): [Post]
    post(_id: ID!): Post
    inventory: [Inventory]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPost(title: String!, postBody: String!): Post
    addComment(postId: ID! commentBody: String!): Comment
    addReply(commentId: ID!, replyBody: String!): Comment
    addInventory(card_name: String!, scryfall_id: String!, img_uri: String! ): Inventory
    addFriend(friendId: ID!): User
    deletePost(_id: ID): Post
  }


  `
  ;


  // export them
module.exports = typeDefs;
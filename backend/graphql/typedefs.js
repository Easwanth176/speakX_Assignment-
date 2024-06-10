const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    user: User
    allUsers: [User!]!
    allTweets: [Tweet!]!
    allComments: [Comment!]!
    tweet(id: ID!): Tweet
    comment(id: ID!): Comment
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    tweets: [Tweet!]!
    followers: [User!]!
    following: [User!]!
  }

  type Tweet {
    id: ID!
    text: String!
    user: User!
    likes: [User!]!
    retweets: [User!]!
    comments: [Comment!]!
    date: String!
  }

  type Comment {
    id: ID!
    text: String!
    user: User!
    tweet: Tweet!
    date: String!
  }

  type Payload {
    token: String!
    user: User
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): Payload
    createTweet(text: String!): Tweet
    deleteTweet(id: ID!): Tweet
    likeTweet(id: ID!): Tweet
    retweet(id: ID!): Tweet
    createComment(text: String!, tweetId: ID!): Comment
    deleteComment(id: ID!): Comment
    followUser(userId: ID!): User
    unfollowUser(userId: ID!): User
  }
`;

module.exports = typeDefs;

import { gql } from '@apollo/client';

export const GET_TWEETS = gql`
  query {
    allTweets {
      id
      text
      user {
        id
        username
      }
      likes {
        id
      }
      comments {
        id
        text
        user {
          id
          username
        }
      }
      date
    }
  }
`;

export const DELETE_TWEET = gql`
  mutation DeleteTweet($id: ID!) {
    deleteTweet(id: $id) {
      id
    }
  }
`;

export const CREATE_TWEET = gql`
  mutation CreateTweet($text: String!) {
    createTweet(text: $text) {
      id
      text
      user {
        id
        username
      }
      date
    }
  }
`;

export const LIKE_TWEET = gql`
  mutation LikeTweet($id: ID!) {
    likeTweet(id: $id) {
      id
      likes {
        id
      }
    }
  }
`;
export const GET_USER = gql`
  query GetUser {
    user {
      id
      username
      email
      tweets {
        id
        text
        likes {
          id
        }
        retweets {
          id
        }
        comments {
          id
          text
          user {
            id
            username
          }
        }
        date
      }
      followers {
        id
        username
      }
      following {
        id
        username
      }
    }
  }
`;
export const RETWEET = gql`
  mutation Retweet($id: ID!) {
    retweet(id: $id) {
      id
      retweets {
        id
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($text: String!, $tweetId: ID!) {
    createComment(text: $text, tweetId: $tweetId) {
      id
      text
      user {
        id
        username
      }
      date
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`;

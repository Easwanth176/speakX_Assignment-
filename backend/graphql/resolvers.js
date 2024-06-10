const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Tweet = require('../models/tweet');
const Comment = require('../models/comment');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      const token = context.req.headers.authorization;
      if (!token) {
        throw new Error('Authentication required');
      }
      const decoded = jwt.verify(token, 'secret');
      const user = await User.findById(decoded.id);
      return user.toObject({ getters: true });
    },
    allUsers: async () => {
      const users = await User.find();
      return users.map(user => user.toObject({ getters: true }));
    },
    allTweets: async () => {
      const tweets = await Tweet.find();
      return tweets.map(tweet => tweet.toObject({ getters: true }));
    },
    allComments: async () => {
      const comments = await Comment.find();
      return comments.map(comment => comment.toObject({ getters: true }));
    },
    tweet: async (parent, args) => {
      const tweet = await Tweet.findById(args.id);
      return tweet.toObject({ getters: true });
    },
    comment: async (parent, args) => {
      const comment = await Comment.findById(args.id);
      return comment.toObject({ getters: true });
    }
  },
  Mutation: {
    register: async (parent, args) => {
      const user = new User(args);
      await user.save();
      return user.toObject({ getters: true });
    },
    login: async (parent, args) => {
      const user = await User.findOne({ email: args.email });
      if (!user) {
        throw new Error('No user with that email');
      }
      const valid = await user.isCorrectPassword(args.password);
      if (!valid) {
        throw new Error('Incorrect password');
      }
      const token = jwt.sign({ id: user.id }, 'secret');
      return { token, user: user.toObject({ getters: true }) };
    },
    createTweet: async (parent, args, context) => {
      const token = context.req.headers.authorization;
      if (!token) {
        throw new Error('Authentication required');
      }
      const decoded = jwt.verify(token, 'secret');
      const user = await User.findById(decoded.id);
      const tweet = new Tweet({ ...args, user: user.id });
      await tweet.save();
      return tweet.toObject({ getters: true });
    },
    deleteTweet: async (parent, args) => {
      const tweet = await Tweet.findByIdAndDelete(args.id);
      return tweet ? tweet.toObject({ getters: true }) : null;
    },
    likeTweet: async (parent, args, context) => {
      const token = context.req.headers.authorization;
      if (!token) {
        throw new Error('Authentication required');
      }
      const decoded = jwt.verify(token, 'secret');
      const user = await User.findById(decoded.id);
      const tweet = await Tweet.findById(args.id);
      if (tweet.likes.includes(user.id)) {
        tweet.likes = tweet.likes.filter(id => id.toString() !== user.id.toString());
      } else {
        tweet.likes.push(user.id);
      }
      await tweet.save();
      return tweet.toObject({ getters: true });
    },
    retweet: async (parent, args, context) => {
      const token = context.req.headers.authorization;
      if (!token) {
        throw new Error('Authentication required');
      }
      const decoded = jwt.verify(token, 'secret');
      const user = await User.findById(decoded.id);
      const tweet = await Tweet.findById(args.id);
      if (tweet.retweets.includes(user.id)) {
        tweet.retweets = tweet.retweets.filter(id => id.toString() !== user.id.toString());
      } else {
        tweet.retweets.push(user.id);
      }
      await tweet.save();
      return tweet.toObject({ getters: true });
    },
    createComment: async (parent, args, context) => {
      const token = context.req.headers.authorization;
      if (!token) {
        throw new Error('Authentication required');
      }
      const decoded = jwt.verify(token, 'secret');
      const user = await User.findById(decoded.id);
      const comment = new Comment({ ...args, user: user.id });
      await comment.save();
      // Update tweet's comments
      const tweet = await Tweet.findById(args.tweetId);
      tweet.comments.push(comment._id);
      await tweet.save();
      return comment.toObject({ getters: true });
    },
    deleteComment: async (parent, args) => {
      const comment = await Comment.findByIdAndDelete(args.id);
      return comment ? comment.toObject({ getters: true }) : null;
    },
    followUser: async (parent, args, context) => {
      const token = context.req.headers.authorization;
      if (!token) {
        throw new Error('Authentication required');
      }
      const decoded = jwt.verify(token, 'secret');
      const user = await User.findById(decoded.id);
      const followed = await User.findById(args.userId);
      if (!followed) {
        throw new Error('User not found');
      }
      if (user.following.includes(followed.id)) {
        throw new Error('Already following user');
      }
      user.following.push(followed.id);
      followed.followers.push(user.id);
      await user.save();
      await followed.save();
      return user.toObject({ getters: true });
    },
    unfollowUser: async (parent, args, context) => {
      const token = context.req.headers.authorization;
      if (!token) {
        throw new Error('Authentication required');
      }
      const decoded = jwt.verify(token, 'secret');
      const user = await User.findById(decoded.id);
      const followed = await User.findById(args.userId
      );
      if (!followed) {
        throw new Error('User not found');
      }
      if (!user.following.includes(followed.id)) {
        throw new Error('Not following user');
      }
      user.following = user.following.filter(id => id.toString() !== followed.id.toString());
      followed.followers = followed.followers.filter(id => id.toString() !== user.id.toString());
      await user.save();
      await followed.save();
      return user.toObject({ getters: true });
    }
  },
  Tweet: {
    user: async (tweet) => {
      const user = await User.findById(tweet.user);
      return user.toObject({ getters: true });
    },
    likes: async (tweet) => {
      const users = await User.find({ _id: { $in: tweet.likes } });
      return users.map(user => user.toObject({ getters: true }));
    },
    retweets: async (tweet) => {
      const users = await User.find({ _id: { $in: tweet.retweets } });
      return users.map(user => user.toObject({ getters: true }));
    },
    comments: async (tweet) => {
      const comments = await Comment.find({ _id: { $in: tweet.comments } });
      return comments.map(comment => comment.toObject({ getters: true }));
    }
  },
  User: {
    tweets: async (user) => {
      const tweets = await Tweet.find({ user: user._id });
      return tweets.map(tweet => tweet.toObject({ getters: true }));
    },
    followers: async (user) => {
      const followers = await User.find({ _id: { $in: user.followers } });
      return followers.map(follower => follower.toObject({ getters: true }));
    },
    following: async (user) => {
      const following = await User.find({ _id: { $in: user.following } });
      return following.map(followed => followed.toObject({ getters: true }));
    }
  },
  Comment: {
    user: async (comment) => {
      const user = await User.findById(comment.user);
      return user.toObject({ getters: true });
    },
    tweet: async (comment) => {
      const tweet = await Tweet.findById(comment.tweet);
      return tweet.toObject({ getters: true });
    }
  }
};

module.exports = resolvers;

# Twitter Frontend
## SpeakX Deployed Link
```bash
https://speakx.onrender.com/
```
# SpeakX_Backend graphql API Link
```bash
https://speakx-backend.onrender.com/graphql
```


## Installation

1. Clone the repository:
    ```bash 
    git clone https://github.com/Easwanth176/SpeakX_Frontend.git
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Run the app:
    ```bash
    npm start
    ```

4. Open the browser and go to [http://localhost:3000](http://localhost:3000)

## Usage

This is a simple frontend for Twitter. You can post tweets, like tweets, and retweet tweets. You can also see the tweets of the people you follow.

Sample usage with credentials:
- Username: `speakx@gmail.com`
- Password: `speakx@123`

<!-- Screenshots -->
## Screenshots

### Home Page
![image](https://github.com/Easwanth176/SpeakX_Frontend/assets/103351652/060c425f-b14a-42c2-a302-bd425ede0e25)


### Profile Page
![image](https://github.com/Easwanth176/speakX_Assignment-/assets/103351652/5e1b7bae-8918-411c-a35b-3c8e21d4f264)



### Explore Page
![image](https://github.com/Easwanth176/SpeakX_Frontend/assets/103351652/a2b7449d-2b2c-4fe8-a514-c1a3167d6abc)

### Premium Page
![image](https://github.com/Easwanth176/SpeakX_Frontend/assets/103351652/a5c85ca3-eab5-4183-ab8d-ed5874a12943)


<!-- Explaining the Features -->
## Features

- **Post tweets**: Share your thoughts with the world.
- **Like tweets**: Show appreciation for tweets you enjoy.
- **Retweet tweets**: Share tweets with your followers.
- **Follow users**: Keep up with your favorite people.
- **See tweets of the people you follow**: Stay updated with your network.
- **See your tweets**: View your own tweet history.
- **See your followers**: Check who is following you.
- **See who you are following**: Keep track of people you follow.
- **See the tweets of a user**: View tweets from specific users.
- **See the followers of a user**: See who follows a particular user.
- **See who a user is following**: Check the following list of a user.
- **See the tweets you liked**: View your liked tweets.


### Technologies Used

- React
- Apollo Client
- GraphQL
- CSS

# SpeakX

SpeakX is a Twitter-like application built with React, Apollo Server, GraphQL, and MongoDB. It provides functionalities such as user registration, login, creating tweets, liking and retweeting tweets, following/unfollowing users, and commenting on tweets.


## Features

- User authentication (registration and login)
- Create, delete, like, and retweet tweets
- Comment on tweets and delete comments
- Follow and unfollow users
- Secure access to routes using JWT
## Installation

  Clone the repository:

   ```bash
   git clone https://github.com/Easwanth176/SpeakX_Backend.git
   ```

## How to run the project
```bash
npm install
npm start
```


## GraphQL API

### Queries

- \`user\`: Get the current authenticated user.
- \`allUsers\`: Get all registered users.
- \`allTweets\`: Get all tweets.
- \`allComments\`: Get all comments.
- \`tweet(id: ID!)\`: Get a tweet by ID.
- \`comment(id: ID!)\`: Get a comment by ID.

### Mutations

- \`register(username: String!, email: String!, password: String!)\`: Register a new user.
- \`login(email: String!, password: String!)\`: Login and get a JWT token.
- \`createTweet(text: String!)\`: Create a new tweet.
- \`deleteTweet(id: ID!)\`: Delete a tweet by ID.
- \`likeTweet(id: ID!)\`: Like or unlike a tweet by ID.
- \`retweet(id: ID!)\`: Retweet or unretweet a tweet by ID.
- \`createComment(text: String!, tweetId: ID!)\`: Create a comment on a tweet.
- \`deleteComment(id: ID!)\`: Delete a comment by ID.
- \`followUser(userId: ID!)\`: Follow a user by ID.
- \`unfollowUser(userId: ID!)\`: Unfollow a user by ID.

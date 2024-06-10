import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER, GET_TWEETS } from './Graphql';
import './Css/Profile.css';
export default function Profile() {
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER);
  const { loading: tweetsLoading, error: tweetsError, data: tweetsData } = useQuery(GET_TWEETS);

  if (userLoading || tweetsLoading) return <p>Loading...</p>;
  if (userError) {
    console.error('Error fetching user data:', userError);
    return <p>Error: {userError.message}</p>;
  }
  if (tweetsError) {
    console.error('Error fetching tweets:', tweetsError);
    return <p>Error: {tweetsError.message}</p>;
  }

  console.log('Fetched user data:', userData);
  console.log('Fetched tweets data:', tweetsData);

  if (!userData || !userData.user) {
    console.error('No user data found:', userData);
    return <p>No user data found.</p>;
  }

  const { id: userId, username, email, joined, followers, following } = userData.user;

  // Filter tweets that were posted by the current user
  const userTweets = tweetsData.allTweets.filter(tweet => tweet.user.id === userId);

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <p>Username: <span>{username}</span></p>
      <p>Email: <span>{email}</span></p>
      <p>Joined: <span>{joined}</span></p>
      <p>Followers: <span>{followers.length}</span></p>
      <p>Following: <span>{following.length}</span></p>
      <h2>Tweets Posted:</h2>
      <div className="tweets-list">
        {userTweets.map(tweet => (
          <div key={tweet.id} className="tweet">
            <p>{tweet.text}</p>
            <p>By: {tweet.user.username}</p>
            <p>Likes: {tweet.likes ? tweet.likes.length : 0}</p>
            <p>Retweets: {tweet.retweets ? tweet.retweets.length : 0}</p>
            <p>Comments:</p>
            <ul>
              {tweet.comments ? (
                tweet.comments.map(comment => (
                  <li key={comment.id}>
                    <p>{comment.text}</p>
                    <p>By: {comment.user.username}</p>
                  </li>
                ))
              ) : (
                <li>No comments yet.</li>
              )}
            </ul>
          </div>
        ))}
      </div>
      <button>Logout</button>
    </div>
  );
}

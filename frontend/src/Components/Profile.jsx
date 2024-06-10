import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER, GET_TWEETS } from './Graphql';
import './Css/Profile.css';
import defaultProfileImage from './assets/Default.png';
import easwanth176 from './assets/easwanth176.jpg';
import Aaradhya143 from './assets/Aaradhya143.jpg';
import pavan49 from './assets/Pavan.png';
import kiran078 from './assets/Kiran.png';
import sree026 from './assets/Sree.png';
import sasank1221 from './assets/Sasank.gif';
import abhi3442 from './assets/Abhi.png';

const Profile = () => {
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

  const getProfileImage = (username) => {
    switch (username) {
      case 'easwanth176':
        return easwanth176;
      case 'Aaradhya143':
        return Aaradhya143;
      case 'pavan49':
        return pavan49;
      case 'kiran078':
        return kiran078;
      case 'sree026':
        return sree026;
      case 'sasank1221':
        return sasank1221;
      case 'abhi3442':
        return abhi3442;
      default:
        return defaultProfileImage;
    }
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-header">
        <img
          src={getProfileImage(username)}
          alt="profile"
          className="profile-image"
          onError={(e) => {
            e.target.src = defaultProfileImage;
          }}
        />
        <div className="profile-details">
          <p>Username: <span>{username}</span></p>
          <p>Email: <span>{email}</span></p>
          <p>Joined: <span>{joined}</span></p>
          <p>Followers: <span>{followers.length}</span></p>
          <p>Following: <span>{following.length}</span></p>
        </div>
      </div>
      <h2>Tweets Posted:</h2>
      <div className="tweets-list">
        {userTweets.map(tweet => (
          <div key={tweet.id} className="tweet">
            <img
              src={getProfileImage(tweet.user.username)}
              alt="tweet profile"
              className="tweet-profile-image"
              onError={(e) => {
                e.target.src = defaultProfileImage;
              }}
            />
            <div className="tweet-content">
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
          </div>
        ))}
      </div>
      <button>Logout</button>
    </div>
  );
}

export default Profile;

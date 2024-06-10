import React, { useState } from 'react';
import './Css/Users.css';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import defaultProfileImage from './assets/Default.png';
import easwanth176 from './assets/easwanth176.jpg';
import Aaradhya143 from './assets/Aaradhya143.jpg';
import pavan49 from './assets/Pavan.png';
import kiran078 from './assets/Kiran.png';
import sree026 from './assets/Sree.png';
import sasank1221 from './assets/Sasank.gif';
import abhi3442 from './assets/Abhi.png';
const GET_USERS = gql`
  query GetUsers {
    allUsers {
      id
      username
      email
      followers {
        id
      }
      following {
        id
      }
    }
  }
`;

const FOLLOW_USER = gql`
  mutation FollowUser($userId: ID!) {
    followUser(userId: $userId) {
      id
      username
      followers {
        id
      }
      following {
        id
      }
    }
  }
`;

const UNFOLLOW_USER = gql`
  mutation UnfollowUser($userId: ID!) {
    unfollowUser(userId: $userId) {
      id
      username
      followers {
        id
      }
      following {
        id
      }
    }
  }
`;

export default function Users() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  const [followUserMutation] = useMutation(FOLLOW_USER, {
    update(cache, { data: { followUser } }) {
      cache.modify({
        fields: {
          allUsers(existingUsers = []) {
            const newUserRef = cache.writeFragment({
              data: followUser,
              fragment: gql`
                fragment NewUser on User {
                  id
                  username
                  email
                  followers {
                    id
                  }
                  following {
                    id
                  }
                }
              `
            });
            return [...existingUsers, newUserRef];
          }
        }
      });
    },
    onError: (error) => {
      console.error('Error following user:', error);
    },
  });

  const [unfollowUserMutation] = useMutation(UNFOLLOW_USER, {
    update(cache, { data: { unfollowUser } }) {
      cache.modify({
        fields: {
          allUsers(existingUsers = [], { readField }) {
            return existingUsers.filter(user => {
              const userId = readField('id', user);
              return userId !== unfollowUser.id;
            });
          }
        }
      });
    },
    onError: (error) => {
      console.error('Error unfollowing user:', error);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = data.allUsers.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isFollowing = (user) => {
    return user.following.some(follow => follow.id === localStorage.getItem('userId'));
  };

  const handleFollowUser = (userId) => {
    followUserMutation({ variables: { userId } });
  };

  const handleUnfollowUser = (userId) => {
    unfollowUserMutation({ variables: { userId } });
  };

  return (
    <div className="users-container">
         <div className="premium">
        <h3>Subscribe to Premium</h3>
        <p>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
        <button>
          <Link to={{ pathname: '/home/premium', state: { selected: 'Premium' } }}>
            Subscribe
          </Link>
        </button>
      </div>

      <div className="together">
      <h3>Twitter Users</h3>

      <input
        type="text"
        placeholder="Search Users"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: '1rem' }}
      />



      <div className="users-list">
        {filteredUsers.map(user => {
          let profileImage;
          switch (user.username) {
            case 'easwanth176':
              profileImage = easwanth176;
              break;
            case 'Aaradhya143':
              profileImage = Aaradhya143;
              break;
            case 'pavan49':
              profileImage = pavan49;
              break;
            case 'kiran078':
              profileImage = kiran078;
              break;
            case 'sree026':
              profileImage = sree026;
              break;
            case 'sasank1221':
              profileImage = sasank1221;
              break;
            case 'abhi3442':
              profileImage = abhi3442;
              break;
            default:
              profileImage = defaultProfileImage;
              break;
          }

          return (
            <div key={user.id} className="user-card">
              <div className="user-card-img">
              <img
                src={profileImage} // Use the selected profile image
                alt="profile"
                onError={(e) => {
                  e.target.src = defaultProfileImage; // Use default profile image on error
                }}
              />
              </div>
                <div className="user-content">
                <h3>{user.username}</h3>
              <p>Followers: {user.followers.length}</p>
           
                </div>
                {localStorage.getItem('userId') !== user.id && (
                <>
                  {isFollowing(user) ? (
                    <button onClick={() => handleUnfollowUser(user.id)}>Unfollow</button>
                  ) : (
                    <button onClick={() => handleFollowUser(user.id)}>Follow</button>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>





      </div>
   
    
    </div>
  );
}

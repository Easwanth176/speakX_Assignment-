import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import './Css/Sidebar.css';
import logo from './assets/logo.png';
import { GET_USER } from './Graphql';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCrown, faCompass, faBell, faUser, faFeatherAlt } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
    const { loading, error, data } = useQuery(GET_USER);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { username } = data.user;

    return (
        <div className="sidebar">
            <div>
                <img src={logo} alt="logo" />
                <div className="user-side">
                    <h3>{username}</h3>
                    <p>@{username}</p>
                </div>
                
                <nav>
                    <ul>
                        <li>
                            <Link to={{ pathname: '/home', state: { selected: 'home' } }}>
                                <FontAwesomeIcon icon={faHome} className="icon" />
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to={{ pathname: '/home/premium', state: { selected: 'Premium' } }}>
                                <FontAwesomeIcon icon={faCrown} className="icon" />
                                Premium
                            </Link>
                        </li>
                        <li>
                            <Link to={{ pathname: '/home/explore', state: { selected: 'explore' } }}>
                                <FontAwesomeIcon icon={faCompass} className="icon" />
                                Explore
                            </Link>
                        </li>
                        <li>
                            <Link to={{ pathname: '/home/notifications', state: { selected: 'Notifications' } }}>
                                <FontAwesomeIcon icon={faBell} className="icon" />
                                Notifications
                            </Link>
                        </li>
                        <li>
                            <Link to={{ pathname: '/home/profile', state: { selected: 'Profile' } }}>
                                <FontAwesomeIcon icon={faUser} className="icon" />
                                Profile
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="tweet-button">
                    <button>
                        <FontAwesomeIcon icon={faFeatherAlt} className="icon" />
                        <Link to={{ pathname: '/home', state: { selected: 'home' } }}>
                            Tweet
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

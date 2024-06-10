import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Css/Home.css';
import Tweet from './Tweet';
import Users from './Users';
import Explore from './Explore';
import Premium from './Premium';
import Profile from './Profile';
import Notifications from './Notifications';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if token does not exist
      navigate('/login');
    }
  }, [navigate]);

  const Component = () => {
    const { pathname, state } = location;
    const selected = state?.selected;

    switch (pathname) {
      case '/home':
        return selected === 'explore' ? <Explore /> : <Tweet />;
      case '/home/explore':
        return <Explore />;
      case '/home/profile':
        return <Profile />;
      case '/home/premium':
        return <Premium />;
      case '/home/notifications':
        return <Notifications />;
      default:
        return <Tweet />;
    }
  };

  return (
    <div className="home-container">
      <div className="left-container">
        <Sidebar />
        <button className="leftiii" onClick={handleLogout}>Logout</button>      </div>
      {Component()}
      <Users />
    </div>
  );
};

export default Home;

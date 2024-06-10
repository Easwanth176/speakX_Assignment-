import React from 'react';
import './Css/Notifications.css';

const notifications = [
  { icon: 'fas fa-bell', text: 'New message from John Doe', time: '2 minutes ago' },
  { icon: 'fas fa-heart', text: 'Sarah liked your Tweet', time: '5 minutes ago' },
  { icon: 'fas fa-retweet', text: 'Your Tweet was retweeted by Alex', time: '10 minutes ago' },
  { icon: 'fas fa-user-plus', text: 'You have a new follower', time: '15 minutes ago' },
  // ... (add more notifications to reach 35 total)
];

for (let i = notifications.length; i <notifications.length ; i++) {
  notifications.push({
    icon: 'fas fa-info-circle',
    text: `Notification ${i + 1}`,
    time: `${i * 3} minutes ago`,
  });
}

export default function Notifications() {
  return (
    <div className="notifications">
      {notifications.map((notification, index) => (
        <div key={index} className="notification-item">
          <div className="notification-icon">
            <i className={notification.icon}></i>
          </div>
          <div className="notification-content">
            <p className="notification-text">{notification.text}</p>
            <p className="notification-time">{notification.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

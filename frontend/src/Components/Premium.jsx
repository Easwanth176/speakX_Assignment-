import React from 'react';
import './Css/Premium.css';

function Premium() {
  return (
    <div className="upgrade-container">
      <h1>Upgrade to Premium</h1>
      <p>Enjoy an enhanced experience, exclusive creator tools, top-tier verification and security.</p>
      <div className="pricing-table">
        <div className="plan basic">
          <h2>Basic</h2>
          <p className="price">$215.87/month</p>
          <p className="billing">Billed annually</p>
          <ul>
            <li>Small reply boost</li>
            <li>Encrypted direct messages</li>
            <li>Bookmark folders</li>
            <li>Highlights tab</li>
   
          </ul>
          <button>Subscribe</button>
        </div>
        <div className="plan premium">
          <h2>Premium</h2>
          <p className="price">$566.67/month</p>
          <p className="billing">Billed annually (SAVE 17%)</p>
          <ul>
            <li>Everything in Basic</li>
            <li>Half Ads in For You and Following</li>
            <li>Larger reply boost</li>
            <li>Get paid to post</li>
          </ul>
          <button>Subscribe</button>
        </div>
        <div className="plan premium-plus">
          <h2>Premium+</h2>
          <p className="price">$1,133.33/month</p>
          <p className="billing">Billed annually (SAVE 12%)</p>
          <ul>
            <li>Everything in Premium</li>
            <li>No Ads in For You and Following</li>
            <li>Largest reply boost</li>
            <li>Grok Early Access</li>
            <li>X Pro, Analytics, Media Studio</li>
            <li>Creator Subscriptions</li>

          </ul>
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default Premium;

import React from 'react';
import './HeroImage.css';

export default ({
  title,
  tagline1,
  tagline2,
  image,
  imageOverlay,
  backgroundSize = 'cover',
  backgroundPosition = 'center center',
  backgroundAttachment = 'local',
  height = '100vh',
  unsplashAuthorName,
  unsplashAuthorUser,
  children
}) => {
  const backgroundImage = imageOverlay
    ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${image}")`
    : `url("${image}")`;

  return (
    <section
      className="heroimage"
      style={{
        height,
        backgroundImage,
        backgroundSize,
        backgroundPosition,
        backgroundAttachment
      }}>
      <div className="hero-inner">
        <h1>{title}</h1>
        <h2>{tagline1}</h2>
        <h2>{tagline2}</h2>
        {children}
      </div>

      {unsplashAuthorName && unsplashAuthorUser && (
        <a
          className="credits"
          href={`https://unsplash.com/@${unsplashAuthorUser}?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge`}
          target="_blank"
          rel="noopener noreferrer">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <title>unsplash-logo</title>
              <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z" />
            </svg>
          </span>
          <span>{`${unsplashAuthorName}`}</span>
        </a>
      )}
    </section>
  );
};

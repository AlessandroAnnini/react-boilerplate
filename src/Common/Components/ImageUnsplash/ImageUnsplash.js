import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from './Typography';
import './ImageUnsplash.css';

const useStyles = makeStyles(theme => ({
  container: {
    color: 'white',
    minHeight: 300,
    minWidth: 200,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    transform: 'perspective(100px) translateZ(0px)',
    boxShadow: '0 0 0 0 #ccc',
    transition: '2.0s',

    '&:hover': {
      transform: 'perspective(100px) translateZ(5px)',
      boxShadow: '3px 3px 5px 6px rgba(0, 0, 0, 0.3);',
      transition: '1s'
    }
  },
  textContainer: {
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  text: {
    color: '#fafafa'
  }
}));

export default ({ text, image, unsplashAuthorName, unsplashAuthorUser }) => {
  const classes = useStyles();
  const backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${image}")`;

  return (
    <div className={classes.container} style={{ backgroundImage }}>
      <div className={classes.textContainer}>
        <Typography variant="h5" marked="center" className={classes.text}>
          {text}
        </Typography>
      </div>

      {unsplashAuthorName && unsplashAuthorUser && (
        <a
          className="iu_credits"
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
    </div>
  );
};

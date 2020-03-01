import React from 'react';
import Spinner from 'react-spinkit';
import { makeStyles } from '@material-ui/styles';

// https://kyleamathews.github.io/react-spinkit/

const useStyles = makeStyles(theme => ({
  root: {
    top: 0,
    backgroundColor: theme.palette.primary.dark,
    opacity: 0.9,
    position: 'fixed',
    zIndex: 9999,
    width: '100%',
    height: '100vh'
  },
  container: {
    position: 'absolute',
    top: '50vh',
    left: '50%',
    transform: 'translate(-50%)'
  },
  loader: {
    zoom: 2,
    color: theme.palette.secondary.main
  }
}));

export default ({ visible }) => {
  const classes = useStyles();

  if (!visible) return null;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Spinner name="ball-grid-pulse" className={classes.loader} />
      </div>
    </div>
  );
};

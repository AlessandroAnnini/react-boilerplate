import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 150,
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  image: {
    display: 'inline-block',
    marginTop: 50,
    maxWidth: '100%',
    width: 560
  }
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography algin="center" variant="h1">
        404: The page you are looking for isn’t here
      </Typography>
      <Typography algin="center" variant="subtitle2">
        You either tried some shady route or you came here by mistake. Whichever
        it is, try using the navigation
      </Typography>
      <img
        alt="Under development"
        className={classes.image}
        src="/images/undraw_page_not_found_su7k.svg"
      />
    </div>
  );
};

export default NotFound;

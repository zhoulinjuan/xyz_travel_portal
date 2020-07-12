import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: '1rem'
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://google.com/">
          XYZ Pte Ltd
        </Link>
        {new Date().getFullYear()}
      </Typography>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { useDispatch, useSelector } from 'react-redux';
import {
  Select,
  MenuItem,
  Button,
  makeStyles,
  Container,
  CssBaseline,
  Typography,
  FormControl
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import * as actions from '../../actions';

const selector = ({ store, login }) => ({
  user: login.user,
  isPending: store.isPending
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    minWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const Application = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selector);
  const [userName, setUserName] = useState('');

  const handleChange = (event) => {
    setUserName(event.target.value);
  };

  const clickButton = () => {
    dispatch(actions.requestLogin.request(userName));
  };

  useEffect(() => {
    user && user.applicantName && navigate('/application/dashboard');
  }, [user]);

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <FormControl className={classes.formControl}>
            <InputLabel id="userID">Select User</InputLabel>
            <Select
              labelId="userID"
              id="userID"
              value={userName}
              onChange={handleChange}
            >
              <MenuItem value={'mike@xyz.com'}>mike@xyz.com</MenuItem>
              <MenuItem value={'isen@agent.com'}>isen@agent.com</MenuItem>
              <MenuItem value={'keith@xyz.com'}>keith@xyz.com</MenuItem>
              <MenuItem value={'ken@eft.com'}>ken@eft.com</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={clickButton}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default Application;

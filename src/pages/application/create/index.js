import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TravellerForm from './TravellerForm';
import TravelForm from './TravelForm';
import ReviewForm from './ReviewForm';
import * as actions from '../../../actions';
import {
  useValidate,
  usePartialValidate
} from '../../../utils/helpers/validation';
import config from '../config.json';
import addDays from 'date-fns/addDays';
import moment from 'moment';

const selector = ({ store, login }) => ({
  user: login.user,
  isSubmitApp: store.isSubmitApp
});

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

const steps = ['Traveller Info', 'Travel Details', 'Review Application'];
const validateList = [
  ['employeeName', 'employeeId', 'employeePassport'],
  ['employeeOriginCountry', 'employeeDestinationCountry']
];

export default function Application() {
  const { user, isSubmitApp } = useSelector(selector);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [applicationInfo, setApplicationInfo] = useState({});
  const [status, setStatus] = useState('');

  const isValid = useValidate(
    applicationInfo,
    validateList[activeStep],
    config.validationMap
  );
  const { validation, setValidationList, onValidate } = usePartialValidate(
    applicationInfo,
    config.validationMap
  );

  useEffect(() => {
    setApplicationInfo({
      uen: user.uen,
      submitby: user.applicantEmail,
      employeeTravelFromDate: moment(new Date()).utc().format('YYYY-MM-DD'),
      employeeTravelToDate: moment(addDays(new Date(), 1))
        .utc()
        .format('YYYY-MM-DD')
    });
    setActiveStep(0);
  }, [user.uen, user.applicantEmail]);

  const handleNext = () => {
    if (activeStep < 2) {
      setActiveStep(activeStep + 1);
    } else {
      dispatch(
        actions.requestSubmitApp.request(applicationInfo, user.applicantEmail)
      );
      setActiveStep(activeStep + 1);
    }
  };
  useEffect(() => {
    if (isSubmitApp) {
      setStatus(
        'Thank you for your application.  We have emailed your application confirmation, and will send you an update when your application has confirmed.'
      );
    } else {
      setStatus(
        'Your application is not successful, please try again. Thank you!'
      );
    }
  }, [isSubmitApp]);

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const travelDetailsOnChange = (key, input) => {
    (validateList[activeStep] || []).indexOf(key) > -1 &&
      setValidationList((prev) =>
        prev.indexOf(key) < 0 ? [...prev, key] : prev
      );
    setApplicationInfo((prev) => ({ ...prev, [key]: input }));
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <TravellerForm
            applicationInfo={applicationInfo}
            travelDetailsOnChange={travelDetailsOnChange}
            validation={validation}
            onBlur={onValidate}
          />
        );
      case 1:
        return (
          <TravelForm
            applicationInfo={applicationInfo}
            travelDetailsOnChange={travelDetailsOnChange}
            validation={validation}
            onBlur={onValidate}
          />
        );
      case 2:
        return <ReviewForm applicationInfo={applicationInfo} />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Travel Application
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="subtitle1">{status}</Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={!isValid}
                  >
                    {activeStep === steps.length - 1
                      ? 'Submit Application'
                      : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </>
  );
}

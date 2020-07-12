import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import config from '../config.json';
import { useSelector } from 'react-redux';

const selector = ({ login }) => ({
  user: login.user
});

export default function ReviewForm(props) {
  const { applicationInfo } = props;
  const { user } = useSelector(selector);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Applicant Info
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>UEN: {user.uen}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>
            Applicant email: {user.applicantEmail}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>
            Applicant Name: {user.applicantName}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>
            Contact No: {user.applicantContact}
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Travel Details
      </Typography>
      {config.applicationInfoMapping.map((item) => {
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>
                {item.label1} &nbsp; {applicationInfo[item.value1]}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>
                {item.label2} &nbsp; {applicationInfo[item.value2]}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
    </React.Fragment>
  );
}

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import config from '../config.json';
import { isEmptyObject } from '../../../utils/helpers';
import * as actions from '../../../actions';
import Divider from '@material-ui/core/Divider';

const selector = ({ store, login }) => ({
  user: login.user,
  applicationDetails: store.applicationDetails,
  isLoadingAppDetails: store.isLoadingAppDetails
});

export default function ViewApplication(props) {
  const dispatch = useDispatch();
  const { user, applicationDetails } = useSelector(selector);
  const urlParams = new URLSearchParams(props.location.search);
  const paramKey = urlParams.get('applicationId') || '';

  useEffect(() => {
    dispatch(
      actions.requestApplicationDetails.request(paramKey, user.applicantEmail)
    );
  }, [paramKey, user.applicantEmail, dispatch]);

  return (
    <>
      {isEmptyObject(applicationDetails) ? (
        <Typography variant="h6" gutterBottom>
          Loading
        </Typography>
      ) : (
        <React.Fragment>
          <br />

          <Typography variant="h5" gutterBottom>
            Company Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>
                UEN: &nbsp; {applicationDetails.companyInfo.uen}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>
                Company Name: &nbsp;{' '}
                {applicationDetails.companyInfo.companyName}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography gutterBottom>
                Address: &nbsp; {applicationDetails.companyInfo.companyAddress}
              </Typography>
            </Grid>
          </Grid>
          <br />
          <br />
          <Divider variant="middle" />
          <br />

          <Typography variant="h5" gutterBottom>
            Applicant Details
          </Typography>
          {config.applicantInfoMapping.map((item) => {
            return (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography gutterBottom>
                    {item.label1} &nbsp;{' '}
                    {applicationDetails.applicantInfo[item.value1]}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography gutterBottom>
                    {item.label2} &nbsp;{' '}
                    {applicationDetails.applicantInfo[item.value2]}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
          <br />
          <br />
          <Divider variant="middle" />
          <br />
          <Typography variant="h5" gutterBottom>
            Application Details
          </Typography>
          {config.ApplicationDetailsMapping.map((item) => {
            return (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography gutterBottom>
                    {item.label1} &nbsp;{' '}
                    {applicationDetails.applicationInfo[item.value1]}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography gutterBottom>
                    {item.label2} &nbsp;{' '}
                    {applicationDetails.applicationInfo[item.value2]}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
        </React.Fragment>
      )}
    </>
  );
}

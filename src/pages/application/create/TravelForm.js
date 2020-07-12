import 'date-fns';
import React from 'react';
import { Typography, Grid, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import addDays from 'date-fns/addDays';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import moment from 'moment';

export default function TravelForm(props) {
  const { applicationInfo, travelDetailsOnChange, validation, onBlur } = props;

  const handleInputChange = (key) => (val) => {
    const value = val.target ? val.target.value : val;
    travelDetailsOnChange(key, value);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Travel Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            error={validation['employeeOriginCountry']?.isInValid}
            id="countryorigin"
            name="countryorigin"
            label="Country of Origin"
            fullWidth
            autoComplete="Country of Origin"
            value={
              applicationInfo.employeeOriginCountry
                ? applicationInfo.employeeOriginCountry
                : ''
            }
            helperText={validation['employeeOriginCountry']?.message}
            onChange={handleInputChange('employeeOriginCountry')}
            onBlur={onBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            error={validation['employeeDestinationCountry']?.isInValid}
            id="countrydest"
            name="countrydest"
            label="Country of Destination"
            fullWidth
            autoComplete="Country of Destination"
            value={
              applicationInfo.employeeDestinationCountry
                ? applicationInfo.employeeDestinationCountry
                : ''
            }
            helperText={validation['employeeDestinationCountry']?.message}
            onChange={handleInputChange('employeeDestinationCountry')}
            onBlur={onBlur}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Travel From Date"
                value={
                  applicationInfo.employeeTravelFromDate
                    ? applicationInfo.employeeTravelFromDate
                    : new Date()
                }
                onChange={(val) => {
                  const result = moment(val).utc().format('YYYY-MM-DD');
                  handleInputChange('employeeTravelFromDate')(result);
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Travel To Date"
                value={
                  applicationInfo.employeeTravelToDate
                    ? applicationInfo.employeeTravelToDate
                    : addDays(new Date(), 1)
                }
                onChange={(val) => {
                  const result = moment(val).utc().format('YYYY-MM-DD');
                  handleInputChange('employeeTravelToDate')(result);
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

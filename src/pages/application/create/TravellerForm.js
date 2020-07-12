import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function TravellerForm(props) {
  const { applicationInfo, travelDetailsOnChange, validation, onBlur } = props;

  const handleInputChange = (key) => (val) => {
    const value = val.target ? val.target.value : val;
    travelDetailsOnChange(key, value);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Traveller Info
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            error={validation['employeeName']?.isInValid}
            required
            id="travellerName"
            name="travellerName"
            label="Traveller Name"
            fullWidth
            value={
              applicationInfo.employeeName ? applicationInfo.employeeName : ''
            }
            helperText={validation['employeeName']?.message}
            onChange={handleInputChange('employeeName')}
            onBlur={onBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={validation['employeeId']?.isInValid}
            id="NRIC/FIN"
            name="ic"
            label="NRIC/FIN"
            fullWidth
            value={applicationInfo.employeeId ? applicationInfo.employeeId : ''}
            helperText={validation['employeeId']?.message}
            onChange={handleInputChange('employeeId')}
            onBlur={onBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={validation['employeePassport']?.isInValid}
            required
            id="passport"
            name="passport"
            label="Passport No."
            fullWidth
            value={
              applicationInfo.employeePassport
                ? applicationInfo.employeePassport
                : ''
            }
            helperText={validation['employeePassport']?.message}
            onChange={handleInputChange('employeePassport')}
            onBlur={onBlur}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import { formHandler } from '../../../utils/app/types'

export default function PersonalInformation({ name, career, dateOfBirth, phone, country, city }) {
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Personal Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField label='Name' fullWidth {...name} />
        </Grid>
        <Grid item xs={12}>
          <TextField required label='Career' fullWidth {...career} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label='Date of birth'
            type='date'
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            {...dateOfBirth}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required label='Phone number' type='tel' fullWidth {...phone} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required label='Country' fullWidth {...country} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required label='City' fullWidth {...city} />
        </Grid>
      </Grid>
    </>
  )
}

PersonalInformation.propTypes = {
  name: formHandler.isRequired,
  career: formHandler.isRequired,
  dateOfBirth: formHandler.isRequired,
  phone: formHandler.isRequired,
  country: formHandler.isRequired,
  city: formHandler.isRequired
}

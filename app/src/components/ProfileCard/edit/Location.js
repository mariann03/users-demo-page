import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'

export default function LocationEdit({ handlers: [city, country] }) {
  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label='City' {...city} fullWidth required />
        </Grid>
        <Grid item xs={12}>
          <TextField label='Country' {...country} fullWidth required />
        </Grid>
      </Grid>
    </Grid>
  )
}

LocationEdit.propTypes = {
  handlers: PropTypes.array.isRequired
}

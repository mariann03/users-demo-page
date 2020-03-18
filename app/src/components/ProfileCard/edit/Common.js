import TextField from '@material-ui/core/TextField'
import { Grid } from '@material-ui/core'
import { formHandler } from '../../../../utils/app/types'

export default function CommonEdit({ handler, ...props }) {
  return (
    <Grid item xs={12}>
      <TextField {...handler} {...props} fullWidth required />
    </Grid>
  )
}

CommonEdit.propTypes = {
  handler: formHandler.isRequired
}

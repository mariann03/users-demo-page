import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { formHandler } from '../../../utils/app/types'

export default function PaymentOptions({ paymentMethod, installments }) {
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Payment options
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='paymentMethodLabel'>Payment Method</InputLabel>
            <Select labelId='paymentMethodLabel' {...paymentMethod}>
              <MenuItem value='Credit Card'>Credit Card</MenuItem>
              <MenuItem value='Debit Card'>Debit Card</MenuItem>
              <MenuItem value='Cash'>Cash</MenuItem>
              <MenuItem value='Transfer'>Transfer</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='installmentsLabel'>Installments</InputLabel>
            <Select labelId='installmentsLabel' {...installments}>
              <MenuItem value='1'>1</MenuItem>
              <MenuItem value='3'>3</MenuItem>
              <MenuItem value='6'>6</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}

PaymentOptions.propTypes = {
  paymentMethod: formHandler.isRequired,
  installments: formHandler.isRequired
}

import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

import PropTypes from 'prop-types'
import { formHandler } from '../../../../utils/app/types'

export default function SelectEdit({ handler, options, label }) {
  return (
    <FormControl fullWidth>
      <InputLabel id='installmentsLabel'>{label}</InputLabel>
      <Select labelId='installmentsLabel' {...handler}>
        {options.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

SelectEdit.propTypes = {
  handler: formHandler.isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  label: PropTypes.string.isRequired
}

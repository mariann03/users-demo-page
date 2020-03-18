import FormControl from '@material-ui/core/FormControl'
import MUISelect from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import nanoid from 'nanoid'

import PropTypes from 'prop-types'
import { formHandler } from '../../utils/app/types'
import { useMemo } from 'react'

export default function Select({ handler, options, label, ...rest }) {
  const inputId = useMemo(nanoid, [])

  return (
    <FormControl fullWidth {...rest}>
      <InputLabel id={inputId}>{label}</InputLabel>
      <MUISelect labelId={inputId} {...handler}>
        {options.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  )
}

Select.propTypes = {
  handler: formHandler.isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  label: PropTypes.node.isRequired
}

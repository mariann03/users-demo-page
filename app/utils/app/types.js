import PropTypes from 'prop-types'

export const formHandler = PropTypes.exact({
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired
})

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import { formHandler } from '../../../utils/app/types'

const useStyles = makeStyles({
  edit: {
    marginLeft: 'auto',
    cursor: 'pointer'
  }
})

export default function Item({ Icon, Edit, children, editProps, editing, setEditing, readOnly }) {
  const classes = useStyles()
  if (editing) {
    return <Edit {...editProps} />
  }

  return (
    <Grid item xs={12}>
      <Grid container direction='row' justify='flex-start' alignItems='center' spacing={2} wrap='nowrap'>
        <Grid item>
          <Icon />
        </Grid>
        <Grid item zeroMinWidth>
          <Typography component='p' variant='overline' noWrap>
            {children}
          </Typography>
        </Grid>
        {!readOnly && (
          <Grid item className={classes.edit}>
            <EditIcon onClick={setEditing.bind(null, true)} />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

Item.propTypes = {
  Icon: PropTypes.object.isRequired,
  Edit: PropTypes.func.isRequired,
  editProps: PropTypes.oneOfType([
    PropTypes.shape({ handler: formHandler.isRequired }),
    PropTypes.shape({ handlers: PropTypes.arrayOf(formHandler).isRequired })
  ]).isRequired,
  children: PropTypes.node.isRequired,
  editing: PropTypes.bool.isRequired,
  setEditing: PropTypes.func.isRequired,
  readOnly: PropTypes.bool
}

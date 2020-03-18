import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import { formHandler } from '../../../utils/app/types'
import PropTypes from 'prop-types'

export default function Name({ children, Edit, editorProps, editing, setEditing, readOnly }) {
  const classes = useStyles()

  if (editing) {
    return <Edit {...editorProps} />
  }

  return (
    <Grid item xs={12} zeroMinWidth>
      <Typography component='h2' variant='h5' noWrap>
        {children}
      </Typography>
      {!readOnly && <EditIcon onClick={setEditing.bind(null, true)} className={classes.editName} />}
    </Grid>
  )
}

Name.propTypes = {
  editorProps: PropTypes.shape({ handler: formHandler.isRequired }).isRequired,
  Edit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  editing: PropTypes.bool.isRequired,
  setEditing: PropTypes.func.isRequired,
  readOnly: PropTypes.bool
}

const useStyles = makeStyles({
  editName: {
    top: 6,
    right: 10,
    cursor: 'pointer',
    position: 'absolute'
  }
})

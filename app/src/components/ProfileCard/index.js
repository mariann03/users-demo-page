import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography, Avatar } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'

import SchoolIcon from '@material-ui/icons/School'
import CakeIcon from '@material-ui/icons/Cake'
import PhoneIcon from '@material-ui/icons/Phone'
import PaymentIcon from '@material-ui/icons/AccountBalanceWallet'
import InstallmentsIcon from '@material-ui/icons/Event'

import Button from '../Button'
import Item from './Item'
import LocationEdit from './edit/Location'
import CommonEdit from './edit/Common'
import Name from './Name'
import SelectEdit from './edit/Select'
import useEditor from './hooks/useEditor'
import Alert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'
import CardSkeleton from './Skeleton'

export default function UserProfileCard({ readOnly, defaultValue }) {
  const classes = useStyles()
  const {
    profile: { data, loading, error },
    editableFields,
    handlers,
    updater,
    saveChanges,
    unsavedChanges
  } = useEditor(defaultValue)

  function handleOnSave(e) {
    e.preventDefault()
    saveChanges()
  }

  if (loading) return <CardSkeleton />
  if (error) return <Alert severity='error'>{error}</Alert>

  return (
    <Paper component='form' elevation={3} className={classes.paper} onSubmit={handleOnSave}>
      <div className={classes.avatarBackground}>
        <Avatar className={classes.avatar}>{data.name[0]}</Avatar>
      </div>
      <div className={classes.content}>
        <Grid container className={classes.nameContainer}>
          <Name
            Edit={CommonEdit}
            editorProps={{ handler: handlers.name, label: 'Name' }}
            {...editableFields.name}
            readOnly={readOnly}>
            {data.name}
          </Name>
          <Grid item xs={12}>
            <Typography component='h3' variant='subtitle1' color='textSecondary'>
              {data.email}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems='flex-start' spacing={1} className={classes.userData}>
            <Item
              Icon={LocationOnIcon}
              Edit={LocationEdit}
              editProps={{ handlers: [handlers.city, handlers.country] }}
              {...editableFields.location}
              readOnly={readOnly}>
              {data.city}, {data.country}
            </Item>
            <Item
              isEdditing={unsavedChanges}
              Icon={SchoolIcon}
              Edit={CommonEdit}
              editProps={{ handler: handlers.career, label: 'Career' }}
              {...editableFields.career}
              readOnly={readOnly}>
              {data.career}
            </Item>
            <Item
              Icon={CakeIcon}
              Edit={CommonEdit}
              isEdditing={unsavedChanges}
              editProps={{
                handler: handlers.dateOfBirth,
                label: 'Date of birth',
                type: 'date',
                InputLabelProps: { shrink: true }
              }}
              {...editableFields.dateOfBirth}
              readOnly={readOnly}>
              {new Date(data.dateOfBirth).toLocaleDateString('es')}
            </Item>
            <Item
              isEdditing={unsavedChanges}
              Icon={PhoneIcon}
              Edit={CommonEdit}
              editProps={{ handler: handlers.phone, label: 'Phone number' }}
              {...editableFields.phone}
              readOnly={readOnly}>
              {data.phone}
            </Item>
            <Item
              Icon={PaymentIcon}
              Edit={SelectEdit}
              isEdditing={unsavedChanges}
              editProps={{
                handler: handlers.paymentMethod,
                options: ['Credit Card', 'Debit Card', 'Cash', 'Transfer'],
                label: 'Payment method'
              }}
              {...editableFields.paymentMethod}
              readOnly={readOnly}>
              {data.paymentMethod}
            </Item>
            <Item
              Icon={InstallmentsIcon}
              Edit={SelectEdit}
              isEdditing={unsavedChanges}
              editProps={{
                handler: handlers.installments,
                options: [1, 3, 6],
                label: 'Payment method'
              }}
              {...editableFields.installments}
              readOnly={readOnly}>
              {data.installments} Installments
            </Item>
            {!readOnly && unsavedChanges && (
              <Grid item xs={12}>
                <Button
                  className={classes.save}
                  type='submit'
                  loading={updater.loading}
                  variant='contained'
                  color='primary'>
                  Save
                </Button>
              </Grid>
            )}
            {updater.error && <Alert severity='error'>{updater.error}</Alert>}
          </Grid>
        </Grid>
      </div>
    </Paper>
  )
}

UserProfileCard.propTypes = {
  readOnly: PropTypes.bool,
  defaultValue: PropTypes.any
}

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 200,
    maxWidth: 350,
    margin: 'auto',
    marginTop: theme.spacing(3),
    borderRadius: '10px',
    overflow: 'hidden'
  },
  content: {
    padding: 20,
    paddingTop: 70
  },
  avatarBackground: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  avatar: {
    top: '70px',
    width: '150px',
    height: '150px',
    border: 'solid 7px white',
    fontSize: '78px',
    margin: 'auto',
    textTransform: 'capitalize'
  },
  userData: {
    padding: '10px'
  },
  save: {
    display: 'block',
    marginLeft: 'auto'
  },
  nameContainer: {
    textAlign: 'center',
    position: 'relative'
  },
  editName: {
    top: 6,
    right: 10,
    cursor: 'pointer',
    position: 'absolute'
  }
}))

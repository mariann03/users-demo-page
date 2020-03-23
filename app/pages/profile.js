import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import Button from '../src/components/Button'

import PersonalInformation from '../src/layouts/profile/PersonalInformation'
import PaymentOptions from '../src/layouts/profile/PaymentOptions'

import useForm from '../src/hooks/useForm'
import usePost from '../src/hooks/usePost'
import { capitalize } from '../utils/app/strings'

import { useStateContext } from '../src/context/State'
import { updateProfile } from '../src/context/actions'

const steps = ['Personal information', 'Payment options']

function getForm(step) {
  switch (step) {
    case 0:
      return PersonalInformation
    case 1:
      return PaymentOptions
    default:
      throw new Error('Unkown step')
  }
}

export default function Profile() {
  const classes = useStyles()
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [name, career, dateOfBirth, phone, country, city, paymentMethod, installments] = useForm(10)
  const ActiveForm = useCallback(getForm(activeStep), [activeStep])
  const formProps = [
    { name, career, dateOfBirth, phone, country, city },
    { paymentMethod, installments }
  ]
  const { post, error, loading } = usePost()
  const {
    state: {
      userProfile: { data, loading: profileLoading }
    },
    dispatch
  } = useStateContext()

  useEffect(() => {
    if (!data?.id) return
    router.push('/')
  }, [data])

  async function handleNext(e) {
    e.preventDefault()
    if (activeStep < 1) {
      setActiveStep(activeStep + 1)
      return
    }

    const response = await post('/api/user/profile/create', {
      name: name.value,
      career: career.value,
      dateOfBirth: dateOfBirth.value,
      phone: phone.value,
      country: country.value,
      city: city.value,
      paymentMethod: paymentMethod.value,
      installments: installments.value
    })
    if (response.status >= 400) return console.error(response.data)
    updateProfile(dispatch, response.data)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  if (profileLoading || data?.id) return null

  return (
    <main className={classes.layout}>
      <Typography component='h1' variant='h2' align='center'>
        Welcome{!!name.value && ` ${capitalize(name.value)}`}!
      </Typography>
      <Typography component='p' variant='subtitle1' color='textSecondary' align='center'>
        Please complete the following form with your information
      </Typography>
      <Paper className={classes.paper}>
        <Typography component='h2' variant='h4' align='center'>
          Form
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleNext}>
          <ActiveForm {...formProps[activeStep]} />
          {error && (
            <Alert severity='error' className={classes.alert}>
              {error.data}
            </Alert>
          )}
          <div className={classes.buttons}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} className={classes.button} disabled={loading}>
                Back
              </Button>
            )}
            <Button variant='contained' color='primary' type='submit' className={classes.button} loading={loading}>
              {activeStep === steps.length - 1 ? 'Save form' : 'Next'}
            </Button>
          </div>
        </form>
      </Paper>
    </main>
  )
}

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  alert: {
    marginTop: theme.spacing(3)
  }
}))

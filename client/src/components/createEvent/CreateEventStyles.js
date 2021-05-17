import { makeStyles } from '@material-ui/core/styles'

export const createEventStyles = makeStyles(theme => ({
  root: {
    maxWidth: '60%',
    margin: '0 auto',
    padding: '5rem'
  },
  textFields: {
    marginBottom: '3rem',
    width: '100%',
    '& input': {
      fontSize: '1.6rem'
    },
    '& p': {
      fontSize: '1.2rem'
    }
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  datePicker: {
    width: '100%',
    marginBottom: '3rem',
    fontSize: '1.6rem'
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      maxWidth: '100%',
      margin: '0 auto',
      padding: '1rem',
      marginBottom: '3rem'
    },
    formTitle: {
      textAlign: 'center',
      marginBottom: '3rem',
      fontSize: '2rem'
    }
  }
}))

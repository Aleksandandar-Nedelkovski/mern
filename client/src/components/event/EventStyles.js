import { makeStyles } from '@material-ui/core/styles'

export const eventStyles = makeStyles(theme => ({
  container: {
    padding: '3rem',
    width: '100%'
  },
  media: {
    maxHeight: '30rem',
    width: '100%',
    objectFit: 'cover',
    borderRadius: 10
  },
  eventContent: {
    marginTop: '3rem'
  },
  eventDetails: {
    margin: '2rem 0'
  },
  createdBy: {
    display: 'flex',
    alignItems: 'center',
    '& h5': {
      marginLeft: '1rem'
    }
  },
  eventActions: {
    margin: '2rem 0',
    '& button': {
      marginRight: '2rem'
    },
    '& a': {
      marginRight: '2rem'
    }
  },
  description: {
    marginTop: '3rem',
    '& h3': {
      marginBottom: '2rem'
    }
  },
  [theme.breakpoints.down('md')]: {
    container: {
      '& h2': {
        fontSize: '1.6rem'
      },
      '& h3': {
        fontSize: '1.6rem'
      },
      '& h4': {
        fontSize: '1.6rem'
      },
      '& p': {
        fontSize: '1rem'
      }
    },
    eventActions: {
      margin: '2rem 0',
      '& button': {
        marginRight: '1rem',
        fontSize: '1rem'
      },
      '& a': {
        marginRight: '1rem',
        fontSize: '1rem'
      }
    }
  }
}))

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles(theme => ({
  attendeeUser: {
    margin: '2rem 0',
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  attendeeAvatar: {
    width: '5rem',
    height: '5rem',
    marginRight: '2rem'
  },
  host: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
    padding: '0 1rem',
    position: 'absolute',
    bottom: 0,
    left: 0
  }
}))

const AttendeeItem = ({ name, avatar, host }) => {
  const classes = useStyles()
  return (
    <div className={classes.attendeeUser}>
      <Avatar className={classes.attendeeAvatar} alt='' src={avatar} />
      {host && (
        <div className={classes.host}>
          <Typography variant='body2'>Host</Typography>
        </div>
      )}
      <Typography variant='h5'>{name}</Typography>
    </div>
  )
}

export default AttendeeItem

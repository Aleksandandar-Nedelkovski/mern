import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import RoomIcon from '@material-ui/icons/Room'

const useStyles = makeStyles(theme => ({
  marker: {
    width: 30,
    height: 30,
    fill: theme.palette.secondary.main
  }
}))

const Marker = () => {
  const classes = useStyles()
  return (
    <Fragment>
      <RoomIcon className={classes.marker} />
    </Fragment>
  )
}

export default Marker

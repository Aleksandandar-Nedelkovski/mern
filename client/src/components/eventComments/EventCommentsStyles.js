import { makeStyles } from '@material-ui/core/styles'

export const commentStyles = makeStyles(theme => ({
  comments: {
    marginTop: '3rem',
    '& h3': {
      marginBottom: '2rem'
    }
  },
  comment: {
    margin: '2rem 0',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #eee'
  },
  commentUser: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '3rem'
  },
  commentUserAvatar: {
    width: '6rem',
    height: '6rem',
    marginRight: '2rem'
  },
  commentIcon: {
    marginLeft: 'auto',
    width: '2.6rem',
    height: '2.6rem',
    fill: 'red',
    cursor: 'pointer'
  },
  commentForm: {
    margin: '2rem 0 4rem',
    display: 'flex',
    alignItems: 'flex-end',
    '& button': {
      marginTop: '1rem',
      marginLeft: '2rem'
    }
  },
  commentDate: {
    color: '#aaa',
    fontStyle: 'italic'
  },
  [theme.breakpoints.down('sm')]: {
    commentButton: {
      fontSize: '1rem'
    },
    formButton: {
      fontSize: '1rem'
    },
    formInput: {
      '& input': {
        fontSize: '1rem'
      }
    },
    comment: {
      display: 'block'
    },
    commentUser: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    commentUserAvatar: {
      width: '3rem',
      height: '3rem',
      marginRight: '1rem'
    }
  }
}))

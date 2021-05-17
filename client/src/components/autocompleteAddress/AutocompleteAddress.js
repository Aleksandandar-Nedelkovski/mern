import React from 'react'
import PropTypes from 'prop-types'
import PlacesAutocomplete from 'react-places-autocomplete'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  textFields: {
    marginBottom: '3rem',
    width: '100%',
    '& input': {
      fontSize: '1.6rem'
    },
    '& p': {
      fontSize: '1.2rem'
    }
  }
}))

const AutocompleteAddress = ({ handleAddressChange, address, handleSelect }) => {
  const classes = useStyles()
  return (
    <PlacesAutocomplete value={address} onChange={handleAddressChange} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <TextField
            {...getInputProps({
              placeholder: 'Lieu',
              className: classes.textFields
            })}
          />
          <div className='autocomplete-dropdown-container'>
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item'
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' }
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  )
}

AutocompleteAddress.propTypes = {
  handleAddressChange: PropTypes.func.isRequired
}

export default AutocompleteAddress

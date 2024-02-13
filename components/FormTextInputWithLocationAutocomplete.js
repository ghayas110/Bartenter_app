

import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const FormTextInputWithLocationAutocomplete = ({ setValues }) => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Location'
      placeholderTextColor='black'
      onPress={(data, details = null) => {
        const location = details?.formatted_address || data.description;
        setValues(location);
      }}
      query={{
        key: 'AIzaSyCk3D9V8gfZ_c7xmNhHs7RpqTODFndxHzU',
        language: 'en',
      }}
      nearbyPlacesAPI='GooglePlacesSearch'
      debounce={400}
   
    />
  );
};

export default FormTextInputWithLocationAutocomplete;

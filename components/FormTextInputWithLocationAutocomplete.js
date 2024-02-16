import React,{useRef,useEffect} from 'react';
import { ScrollView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const FormTextInputWithLocationAutocomplete = ({ setValues }) => {
  const ref = useRef();
  useEffect(() => {
    ref.current?.setAddressText('Some Text');
  }, []);
  return (
    <ScrollView>
    <GooglePlacesAutocomplete
        GooglePlacesDetailsQuery={{ fields: "geometry" }}
        fetchDetails={true}
        disableScroll={true}
        placeholder="Search"
        query={{
          key: "AIzaSyCk3D9V8gfZ_c7xmNhHs7RpqTODFndxHzU",
          language: "en",
        }}
        onPress={(data, details = null) => {
          console.log(JSON.stringify(details.geometry.location),JSON.stringify(data.description),"dsd");
  const latlng =details.geometry.location
    const loc= data.description
    console.log(latlng + loc)
          setValues({location:loc, latlng:latlng});
       
        }}
        onFail={(error) => console.error(error)} />
    </ScrollView>
  );
};

export default FormTextInputWithLocationAutocomplete;

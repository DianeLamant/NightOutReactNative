import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from "react-native-paper";
import Select from 'react-native-select-plus';
import PlacesInput from 'react-native-places-input';

import { GOOGLE_API_KEY } from 'react-native-dotenv';

import TextInput from '../atoms/TextInput';

export default function AddPlace({ navigation }) {

  const [ place, setPlace ] = useState({});
  const establishments = [{key:0, label: 'Restaurant'}, {key:1, label:'Bar'}, {key:2, label:'Hotel'}, {key:3, label:'Supermarket'}]
  const prices = [{key: 0, label: '€'}, {key: 1, label: '€€'}, {key: 2, label: '€€€'}, {key: 3, label: '€€€€'}]

  function handlePlaceSelect(place) {
    let placeLocation = {
      address: place.result.formatted_address,
      location: {
        lat: place.result.geometry.location.lat,
        lng: place.result.geometry.location.lng
      }
    }
    setPlace(prevState=> ({
      ...prevState,
      placeLocation : placeLocation
    }))
  }

  function handleChange(key, value) {
    setPlace(prevState=> ({
      ...prevState,
      [key] : value
    }))
  }

  function handleSubmit() {
    if(place.establishment != null && place.name != null && place.description != null && place.placeLocation != null) {
      place.name.trim();
      place.description.trim();

      fetch(`http://49e50ff5-a43f-4239-a4f0-3eb508bd9ab6.pub.cloud.scaleway.com:3003/places`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(place)
      })
      .then(() => {
        navigation.navigate('Home')

      })
    } else {
      alert('Missing fields')
    }
  }

  return (
    <View style={styles.formContainer}>
      <View style={styles.form}>
        <Select
          data={establishments}
          width={300}
          placeholder="Select an establishment"
          onSelect={(key, text) => handleChange('establishment', text)}
          search={false}
        />
        <TextInput
          value={'name'}
          handleChange={handleChange}
          type={'outlined'}
        />
        <TextInput
          value={'description'}
          handleChange={handleChange}
          type={'outlined'}
        />
        <PlacesInput
          stylesContainer={{
            position: 'relative',
            alignSelf: 'stretch',
            margin: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderColor: '#dedede',
            borderWidth: 1,
          }}
          stylesList={{
              top: 50
          }}
          googleApiKey={GOOGLE_API_KEY}
          placeHolder={"Enter an address"}
          language={"en-US"}
          onSelect={handlePlaceSelect}
        />

        <Select
          data={prices}
          width={300}
          placeholder="Select a price bracket"
          onSelect={(key, text) => handleChange('price', text)}
          search={false}
        />
        <Button
          // icon="camera"
          mode="outlined"
          onPress={handleSubmit}
          >
          Add place
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
  form: {
      height: '80%',
      justifyContent: 'space-around',
      backgroundColor: '#fff',
  }
});


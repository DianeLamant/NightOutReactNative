import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from "react-native-paper";
import Select from 'react-native-select-plus';

import TextInput from '../atoms/TextInput';

export default function AddPlace({ navigation }) {

  const [ place, setPlace ] = useState({});
  const establishments = [{key:0, label: 'Restaurant'}, {key:1, label:'Bar'}, {key:2, label:'Hotel'}, {key:3, label:'Supermarket'}]
  const prices = [{key: 0, label: '€'}, {key: 1, label: '€€'}, {key: 2, label: '€€€'}, {key: 3, label: '€€€€'}]

  function handleChange(key, value) {
    console.log(key, value);

    setPlace(prevState=> ({
      ...prevState,
      [key] : value
    }))
  }

  function handleSubmit() {

    if(place.establishments != null && place.name != null && place.description != null && place.address != null) {
      place.name.trim();
      place.description.trim();
      place.address.trim();

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
        />
        <TextInput
          value={'description'}
          handleChange={handleChange}
        />
        <TextInput
          value={'address'}
          handleChange={handleChange}
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
  },
  form: {
      height: '80%',
      justifyContent: 'space-around'
  },
  schedule: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});


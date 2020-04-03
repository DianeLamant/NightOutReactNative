import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from "react-native-paper";

import PlaceRow from '../molecules/PlaceRow';

export default function Home({ navigation }) {

  const [ places, setPlaces ] = useState([])

  useEffect(() => {
    fetch('http://49e50ff5-a43f-4239-a4f0-3eb508bd9ab6.pub.cloud.scaleway.com:3003/places', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then(function(data) {
          setPlaces(data);
        })
}, [])

    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <Button
            style={styles.button}
            icon="filter-outline"
            mode="outlined"
            onPress={() => navigation.navigate('Filters')}
          >
            Filters
          </Button>
          <Button
            style={styles.button}
            icon="plus-circle-outline"
            mode="outlined"
            onPress={() => navigation.navigate('AddPlace')}
          >
            Add a place
          </Button>
        </View>
        {places.length > 0 &&
        <View style={styles.list}>
          {places.map((data, i) => (
            <PlaceRow place={data}/>
          ))}

        </View>
        }

      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    buttons: {
      flex: 1,
      flexDirection: 'row',
    },
    button: {
      flex: 1,
      height: "100%",
      justifyContent: 'center'
    },
    list: {
      flex: 9,
    }
});


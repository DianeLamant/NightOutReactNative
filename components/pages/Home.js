import React, { useEffect, useState, useContext } from 'react';
import { GlobalState } from '../store';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from "react-native-paper";

import PlaceRow from '../molecules/PlaceRow';

export default function Home({ navigation }) {

  const { dispatch, state: { places } } = useContext(GlobalState);

  useEffect(() => {
    fetch('http://49e50ff5-a43f-4239-a4f0-3eb508bd9ab6.pub.cloud.scaleway.com:3003/places', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then(function(data) {
          dispatch({
            type: 'setPlaces',
            payload: { places: data},
          });
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
        <View style={styles.list}>

        {places.length > 0 ?
          <ScrollView>
            {places.map((place, i) => (
              <PlaceRow navigation={navigation} key={place.id} place={place}/>
            ))}
          </ScrollView>
          :
          <View style={styles.nolist}>
            <Text style={styles.h3}>Please wait</Text>
            <Text style={styles.h4}>If nothing happens, maybe we have nothing in our database, you can add a place </Text>
          </View>
        }
        </View>

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
    },
    nolist: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20
    },
    h3: {
      fontSize: 20,
      color: 'lightblue'
    },
    h4: {
      fontSize: 12,
      color: 'lightgrey',
      textAlign: 'center'
    }
});


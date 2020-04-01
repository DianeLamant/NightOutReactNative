import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from "react-native-paper";

export default function Home({ navigation }) {

  console.log(navigation);


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
          <Text>Home</Text>

        </View>

      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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


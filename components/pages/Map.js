import React, {useState, useEffect, useContext} from 'react';
import { GlobalState } from '../store';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import MapView, { Marker, LatLng } from 'react-native-maps';

export default function Map({ navigation }) {

    const { dispatch, state: { places } } = useContext(GlobalState);

    const [position, setPosition] = useState(null);
    const [ region, setRegion ] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchPostion() {

            let currentMessage = "no permission";
            let currentPosition = null;

            const { status } = await Permissions.askAsync(Permissions.LOCATION);

            if (status === 'granted') {
                try {
                    currentPosition = await Location.getCurrentPositionAsync({
                        enableHighAccuracy: true
                    });
                } catch (error) {
                    currentMessage = error.message;
                }

                setPosition({latitude: currentPosition.coords.latitude, longitude: currentPosition.coords.longitude});
                setMessage(currentMessage);
                setRegion({
                    latitude: currentPosition.coords.latitude,
                    longitude: currentPosition.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                })
            } else {
                alert(currentMessage);
            }
        }
        fetchPostion();
    }, [])

    function onRegionChange(region) {
        setRegion({ region });
    }

    function handlePress(place) {
        dispatch({
            type: 'setPlace',
            payload: { place: place},
          });
        navigation.navigate('PlaceDetails')
    }

    return  <View style={styles.container}>
        <Text>{message}</Text>
        {/*<Paragraph>latitude: {position?.coords?.latitude}, longitude: {position?.coords?.longitude}</Paragraph>*/}
        {position && position.coords ? (
        <Text>latitude: {position.coords.latitude}, longitude: {position.coords.longitude}</Text>
        ) : null}
        {region != null &&
            <MapView
                style={styles.mapStyle}
                region={region}
                onRegionChange={onRegionChange}
                isPreselected={true}
            >
            <Marker
                coordinate={position}
                title='Actual position'
                // description={marker.description}
                pinColor="lightblue"
            />
            {places.length > 0 &&
                places.map((place) => (
                    <Marker
                        key={place.id}
                        coordinate={place.placeLocation.coords}
                        title={place.name}
                        description={place.establishment}
                        onCalloutPress={() => handlePress(place)}
                    />
                ))
            }
            </MapView>
        }
    </View>
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
      mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
  });

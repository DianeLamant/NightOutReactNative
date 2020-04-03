import React, { useContext } from 'react';
import { GlobalState } from '../store';
import { Text, View, StyleSheet } from 'react-native';
import { List, Avatar } from 'react-native-paper';

import Reviews from './Reviews';

export default function PlaceRow({ navigation }) {

    const { state: { place } } = useContext(GlobalState);


    return <View style={styles.container}>
        <View style={styles.header}>
            <Avatar.Icon style={styles.avatar} icon={place.icon} color='white' />
            <Text style={styles.name}>{place.name}</Text>
        </View>

        <View style={styles.descriptionCont}>
            <Text style={styles.description}>Description: {place.description}</Text>
        </View>

        <View style={styles.priceCont}>
            <Text>{place.price}</Text>
        </View>

        <View style={styles.addressCont}>
            <Avatar.Icon style={styles.icon} size={36} icon='map-marker' color='lightblue' />
            <Text style={styles.address}>{place.placeLocation.address}</Text>
        </View>

        <View style={styles.reviews}>
            <Reviews navigation={navigation}/>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white'
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontSize: 20
    },
    avatar: {
        backgroundColor: 'lightgrey'
    },
    name: {
        fontSize: 20,
        paddingLeft: 30
    },
    descriptionCont: {
        flex: 2,
        justifyContent: 'center'
    },
    description: {
        fontSize: 16,
    },
    priceCont: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    addressCont: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    address: {
        flex: 6
    },
    reviews: {
        flex: 5
    }
})
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { List } from 'react-native-paper';

export default function PlaceRow({ place }) {

    console.log(place.name);
    const [ icon, setIcon ] = useState('home-city')

    useEffect(() => {
        console.log(place.establishment);
        if(place.establishment === "Supermarket") {
            setIcon('cart')
        } else if (place.establishment === 'Bar') {
            setIcon('glass-cocktail')
        } else if (place.establishment === "Hotel") {
            setIcon('bed')
        } else if(place.establishment === 'Restaurant') {
            setIcon('silverware-fork-knife')
        }

    }, [])

    return (<List.Item
        title={place.name}
        description={place.description}
        left={props => <List.Icon {...props} icon={icon} />}
        right={props => <Text>{place.price}</Text>}
    />)
}


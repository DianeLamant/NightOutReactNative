import React from 'react';
import { Text } from 'react-native';
import { List } from 'react-native-paper';

export default function PlaceRow({ place }) {

    return (<List.Item
        title={place.name}
        description={place.description}
        left={props => <List.Icon {...props} icon={place.icon} />}
        right={props => <Text>{place.price}</Text>}
    />)
}


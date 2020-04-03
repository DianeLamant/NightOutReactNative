import React, { useContext } from 'react';
import { GlobalState } from '../store';
import { Text } from 'react-native';
import { List } from 'react-native-paper';

export default function PlaceRow({ navigation, place }) {

    const { dispatch } = useContext(GlobalState);

    function handlePress() {
        dispatch({
            type: 'setPlace',
            payload: { place: place},
          });
        navigation.navigate('PlaceDetails')
    }

    return (<List.Item
        title={place.name}
        description={place.description}
        left={props => <List.Icon {...props} icon={place.icon} />}
        right={props => <Text>{place.price}</Text>}
        onPress={handlePress}
    />)
}


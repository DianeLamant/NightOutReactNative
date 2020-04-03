import React, { useContext, useState } from 'react';
import { GlobalState } from '../store';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Checkbox } from 'react-native-paper';
import { AirbnbRating } from 'react-native-elements';

import TextInput from '../atoms/TextInput';

export default function AddReview({ navigation }) {

    const { dispatch, state: { user, place, reviews } } = useContext(GlobalState);
    const [ checked, setChecked ] = useState(false);
    const [ review, setReview ] = useState({ username: user.username, placeId: place.id})

    function handleChange(key, value) {
        setReview(prevState=> ({
          ...prevState,
          [key] : value
        }))
      }

      function handleSubmit() {
        if(review.username != null && review.globalMark != null && review.qualityMark != null && review.atmosphereMark != null && review.welcomeMark != null) {

        setReview(prevState=> ({
            ...prevState,
            accessibility : checked
        }))

        fetch(`http://49e50ff5-a43f-4239-a4f0-3eb508bd9ab6.pub.cloud.scaleway.com:3003/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(review)
          })
          .then(() => {
            dispatch({
              type: 'setReviews',
              payload: { reviews: [...reviews, review]},
            });
            navigation.navigate('PlaceDetails')

          })
        } else {
          alert('Missing fields')
        }
      }

    return <View style={styles.container}>
        <Text style={styles.h2}>Your opinion on the {place.establishment} {place.name} </Text>
        <View style={styles.row}>
            <Text style={styles.text}>Global Mark : </Text>
            <AirbnbRating
                style={styles.rate}
                size={20}
                defaultRating={3}
                showRating={false}
                onFinishRating={(rating) => handleChange('globalMark', rating)}
            />
        </View>
        <View style={styles.row}>
            <Text style={styles.text}>Quality Mark : </Text>
            <AirbnbRating
                style={styles.rate}
                size={20}
                defaultRating={3}
                showRating={false}
                onFinishRating={(rating) => handleChange('qualityMark', rating)}
            />
        </View>
        <View style={styles.row}>
            <Text style={styles.text}>Atmosphere Mark : </Text>
            <AirbnbRating
                style={styles.rate}
                size={20}
                defaultRating={3}
                showRating={false}
                onFinishRating={(rating) => handleChange('atmosphereMark', rating)}
            />
        </View>
        <View style={styles.row}>
            <Text style={styles.text}>Welcome Mark : </Text>
            <AirbnbRating
                style={styles.rate}
                size={20}
                defaultRating={3}
                showRating={false}
                onFinishRating={(rating) => handleChange('welcomeMark', rating)}
            />
        </View>

        <View style={styles.row}>
            <Text style={styles.text}>Accessibility</Text>
            <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => { setChecked(!checked)}}
            />
        </View>

        <View>
            <TextInput
                value={'comment'}
                handleChange={handleChange}
            />
        </View>

        <Button
            mode="outlined"
            onPress={handleSubmit}
            >
            Add my review
        </Button>

    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal : 20
    },
    h2: {
        fontSize: 18,
        textAlign: "center",
        paddingVertical: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    text: {
        flex: 1,
        fontSize: 16
    },
    rate: {
        flex: 1
    }
})
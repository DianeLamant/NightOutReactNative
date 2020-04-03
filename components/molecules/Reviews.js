import React, { useContext, useState, useEffect } from 'react';
import { GlobalState } from '../store';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import ReviewRow from './ReviewRow';
import { ScrollView } from 'react-native-gesture-handler';

export default function Reviews({ navigation }) {

    const { dispatch, state: { place, reviews } } = useContext(GlobalState);

    useEffect(() => {
        dispatch({
            type: 'setReviews',
            payload: { reviews: []},
          });
        fetch(`http://49e50ff5-a43f-4239-a4f0-3eb508bd9ab6.pub.cloud.scaleway.com:3003/reviews?placeId=${place.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then(function(data) {
              dispatch({
                type: 'setReviews',
                payload: { reviews: data},
              });
            })
    }, [])

    return <View style={styles.container}>
        <Text style={styles.h3}>Reviews : </Text>
        <Button
            mode="text"
            onPress={() => {
                navigation.navigate('AddReview')
            }}>
            Add a rewiew
        </Button>

        {reviews.length > 0 ?
        <ScrollView>
        {reviews.map((review, i) => (
            <ReviewRow key={i} review={review} />
        ))}
        </ScrollView>
        :
        <View style={styles.textCont}>
            <Text style={styles.text}>There's not reviews yet</Text>
        </View>
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white'
    },
    h3: {
        fontSize: 20
    },
    textCont: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 16,
    }
})
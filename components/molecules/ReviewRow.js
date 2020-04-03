import React, { useContext, useReducer } from 'react';
import { GlobalState } from '../store';
import { View, Text, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { Rating } from 'react-native-elements';

export default function ReviewRow({review}) {


    return <View style={styles.container}>
        <View style={styles.row}>
            <Text>Global Mark: </Text>
            <Rating
            style={styles.rate}
            imageSize={10}
            readonly
            startingValue={review.globalMark}
            />
        </View>
        <View style={styles.row}>
            <Text>Quality Mark: </Text>
            <Rating
            style={styles.rate}
            imageSize={10}
            readonly
            startingValue={review.qualityMark}
            />
        </View>
        <View style={styles.row}>
            <Text>Atmosphere Mark: </Text>
            <Rating
            style={styles.rate}
            imageSize={10}
            readonly
            startingValue={review.atmosphereMark}
            />
        </View>
        <View style={styles.row}>
            <Text>Welcome Mark: </Text>
            <Rating
            style={styles.rate}
            imageSize={10}
            readonly
            startingValue={review.welcomeMark}
            />
        </View>
        {review.comment &&
        <View style={styles.commentCont}>
            <Text>Comment: </Text>
            <Text style={styles.comment}>{review.comment}</Text>
        </View>
        }
        <Text style={styles.author}>Review post by: {review.username}</Text>

    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rate: {
        paddingLeft: 7
    },
    commentCont: {
        flexDirection: 'row'
    },
    comment: {
        fontStyle: 'italic',
    },
    author: {
        textAlign: 'right',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
    }
})
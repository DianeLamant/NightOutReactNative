import React from 'react';

export const initialState = {
    isLogged: false,
    user: {},
    places: [],
    place: {},
    reviews: []
}

export function reducer(state, action) {
    switch (action.type) {
        case 'setIsLogged':
            return {
                ...state,
                isLogged: action.payload.isLogged
            };
        case 'setUser':
            return {
                ...state,
                user: action.payload.user
            };
        case 'setPlaces':
            return {
                ...state,
                places: action.payload.places
            }
        case 'setPlace':
            return {
                ...state,
                place: action.payload.place
            }
        case 'setReviews':
            return {
                ...state,
                reviews: action.payload.reviews
            }
        default:
            throw new Error();
    }
}

export const GlobalState = React.createContext();
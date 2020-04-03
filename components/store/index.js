import React from 'react';

export const initialState = {
    isLogged: false,
    places: [],
}

export function reducer(state, action) {
    switch (action.type) {
        case 'setIsLogged':
            return {
                ...state,
                isLogged: action.payload.isLogged
            };
        case 'setPlaces':
            return {
                ...state,
                places: action.payload.places
            }
        default:
            throw new Error();
    }
}

export const GlobalState = React.createContext();
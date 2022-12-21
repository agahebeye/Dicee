import React from "react";

export type Action =
    | { type: 'failed', payload: boolean }
    | { type: 'won', payload: boolean }

const initialState = {
    failed: false,
    won: false,
    attempts: 3,
    dice: Array.from({ length: 10 }, () => ({
        key: Math.random().toString().substring(2, 9),
        value: Math.ceil(Math.random() * 6),
        held: false
    }))
}

export function reducer(state: typeof initialState, action: Action) {
    const { type, payload } = action

    switch (type) {
        case "failed":
            return {
                ...state,
                failed: action.payload
            }

        case "won":
            return {
                ...state,
                won: action.payload
            }

        default:
            return state;
    }
}

export function useDiceReducer() {
    return React.useReducer(reducer, initialState)
}